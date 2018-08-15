#!/bin/env node

var express 			= require('express');
var cors 				= require('cors');
var http 				= require('http');
var connect 			= require("connect");
var fs      			= require('fs');
var path 				= require('path');
var session 			= require('express-session');
var ejs 				= require('ejs'); 
var nconf 				= require('nconf');

//body-parser is used to parse the Request body and populate the req.
var bodyParser = require('body-parser');

var sessionCleanJob		     = require("./jobs/session_clean");

var sessionvariable 		= require("./util/SessionVariables");

var baseRouter 				= require.main.require("./router/base_router");
var userRouter 				= require.main.require("./router/user/user_router");
var systemUserRouter 		= require.main.require("./router/user/system_user_router");

var imageUploadRouter 		= require.main.require("./router/common/image_upload_router");
var videoUploadRouter 		= require.main.require("./router/common/video_upload_router");
var audioUploadRouter 		= require.main.require("./router/common/audio_upload_router");
var textAdditionRouter 		= require.main.require("./router/common/text_addition_router");
var secureURLRouter 		= require.main.require("./router/common/secure_url_router");


var litePageurlRouter 		= require.main.require("./router/lite_page_url_router");
var adminlitePageurlRouter 	= require.main.require("./router/liteadmin_page_url_router");

var addressRouter        	= require.main.require("./router/common/address_router");
 

/**
 *  Define the sample application.
 */
var liteapp = function() {

	ejs.open 	= 	'{{'; 
	ejs.close 	= 	'}}';
	
    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
    	var environment = process.env.NODE_ENV || 'dev';
    	console.log(" node env "+process.env.NODE_ENV);
    	nconf.argv().env().file({ file:environment + '.json'});
    	self.port = nconf.get('port');
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function(liteapp) {
    	
    	self.populateCache();

        baseRouter(liteapp,self.zcache);
    	userRouter(liteapp,self.zcache);
        systemUserRouter(liteapp,self.zcache);
    	litePageurlRouter(liteapp,self.zcache);
    	adminlitePageurlRouter(liteapp,self.zcache);
    	imageUploadRouter(liteapp,self.zcache);
        secureURLRouter(liteapp,self.zcache);
        videoUploadRouter(liteapp,self.zcache);
        audioUploadRouter(liteapp,self.zcache);
        textAdditionRouter(liteapp,self.zcache);

    	// Address Router
        addressRouter(liteapp,self.zcache);

         
        
    };
    
    /**
     * 
     */
    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'learniteasy.co.in');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }



    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
    	self.liteapp = express();
    	self.createRoutes(self.liteapp);
    	//self.app.use(allowCrossDomain); //for cross domain
    	self.liteapp.use(express.static(path.join(__dirname, 'public'))); //This is the place for your static stuff
    	self.liteapp.use(session(sessionvariable.SESSION_VARIABLE)); // define session variable
        self.liteapp.use(bodyParser());
    	self.liteapp.use(bodyParser.json());
    	self.liteapp.use(bodyParser.urlencoded({extended: true}));
    	self.liteapp.set("view options", {layout: false});  //This one does the trick for rendering static html
    	self.liteapp.engine('.htm', require('ejs').__express);
    	// Optional since express defaults to CWD/views
    	self.liteapp.set('views', path.join(__dirname, 'view'));
    	 
    	// Without this you would need to
    	// supply the extension to res.render()
    	// ex: res.render('users.html').
    	self.liteapp.set('view engine', 'htm');
        for (var r in self.routes) {
            self.liteapp.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
       /* self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });*/
    	
    	 self.liteapp.listen(self.port, function() {
             console.log('%s: Node server started on %s:%d ...',
                         Date(Date.now() ), self.port);
         });
    };
    
    
    /**
     *  Start the server (starts up the sample application).
     */
    self.createSystemUser = function() {
    	 console.log('%s: within create system user %s:%d ...');
    	 systemUserRouter.addAdminUser();
    };
    
    /**
     *  Invoke Job Scheduler
     */
    self.sessionCleanJob = function() {
    	 console.log('%s: Invoke Job Scheduler %s:%d ...');
    	 sessionCleanJob.job.start();;
    };

};   



/**
 *  main():  Main code.
 */
var liteapp = new liteapp();
liteapp.initialize();
liteapp.start();
liteapp.createSystemUser();
liteapp.sessionCleanJob();
