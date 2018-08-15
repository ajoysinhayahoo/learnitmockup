/**
 * Manage User Router
 */


var http 		= require('http');
var cors 		= require('cors');
var fs 			= require('fs');
var bodyParser 	= require('body-parser');
var Grid 		= require('gridfs-stream');
var session 	= require('express-session');
var jwt         = require('jwt-simple');
var q 			= require('q');

var Constants 	= require.main.require("./util/Constants");

var userController 	= require.main.require("./controller/user/user_controller");

var corsOptions = {
	origin: '*'
};


module.exports = function(app , zcache) {
	
	app.use(bodyParser.json({
		extended : true
	}));
	
	app.use(bodyParser.urlencoded({
		extended : true
	}))
	 
	
	// Register New Student
	app.post('/registerstudent',  cors(corsOptions),  function(req, res) {

		var inputData = req.body;
		inputData.userType = Constants.USER_STUDENT;
		
		console.log("inputData >> "+JSON.stringify(inputData));
		 
		userController.addUser(inputData)
		.then(function(result){
			 console.log(result);
			 res.send(result);
	    }).catch(function(error){
	    	 console.log(error);
	    	 res.send(error);
	    });

	});
	
	/*
		Login user using two step
		1. 	validate userid
		2.	validate password
	 */
	// validate userid
	app.post('/validateuserid',  cors(corsOptions),  function(req, res) {

		var inputData = req.body;
		console.log("validateuserid inputData >> "+JSON.stringify(inputData));
		 
		userController.validateUserId(inputData)
		.then(function(result){
			 console.log(result);
			 res.send(result);
	    }).catch(function(error){
	    	 console.log(error);
	    	 res.send(error);
	    });
 
	   
		
	});

	//validate password
    app.post('/validatepassword',  cors(corsOptions),  function(req, res) {
    	
    	var inputData = req.body;
   	 
    	userController.checkpwd(inputData)
		.then(function(result){
			 console.log(result);
			 res.send(result);
	    }).catch(function(error){
	    	 console.log(error);
	    	 res.send(error);
	    });

    });

    /*
		Login user using one step
	 */
    app.post('/userlogin', cors(corsOptions), function(req, res) {

        var inputData = req.body;

        userController.validateupw(inputData)
            .then(function(result){
                console.log(result);
                res.send(result);
            }).catch(function(error){
            console.log(error);
            res.send(error);
        });

    });
    
    
    /*
		Login user using one step
	 */
	app.post('/userlogout', cors(corsOptions), function(req, res) {
	
	    var inputData = req.body;
	
	    userController.userlogout(inputData)
	        .then(function(result){
	            console.log(result);
	            res.send(result);
	        }).catch(function(error){
	        console.log(error);
	        res.send(error);
	    });
	
	});

    /*
		Change User Password
	 */
	app.post('/changepassword', cors(corsOptions), function(req, res) {
		
		var inputData = req.body;
	 
		userController.updateUserPassword(inputData)
		.then(function(result){
			 console.log(result);
			 res.send(result);
	    }).catch(function(error){
	    	 console.log(error);
	    	 res.send(error);
	    });

	});

    /*
        activate / deactivate user
     */
    app.post('/changeuserstatus',  cors(corsOptions),  function(req, res) {

    	var inputData = req.body;
   	 
		userController.updateUserStatus(inputData)
		.then(function(result){
			 console.log(result);
			 res.send(result);
	    }).catch(function(error){
	    	 console.log(error);
	    	 res.send(error);
	    });
		
    });


    /*
	 Update a User Image
	*/
    app.post('/updateuserimage',  cors(corsOptions),  function(req, res) {

        var inputData = req.body;

        userController.updateUserImage(inputData)
            .then(function(result){
                console.log(result);
                res.send(result);
            }).catch(function(error){
				console.log(error);
				res.send(error);
			});

    });
	
	
	
}

