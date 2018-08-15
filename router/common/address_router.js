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

var addressController 	= require.main.require("./controller/common/address_controller");


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

    /*
        Manage Address
     */
    /*
    	Add Address
     */
    app.post('/addaddress',  cors(corsOptions),  function(req, res) {

        var inputData = req.body;

        console.log("inputData >> "+JSON.stringify(inputData));

        addressController.addAddress(inputData)
            .then(function(result){
                console.log(result);
                res.send(result);
            }).catch(function(error){
                console.log(error);
                res.send(error);
            });

    });

    /*
        Update Address
     */
    app.post('/updateaddress',  cors(corsOptions),  function(req, res) {

        var inputData = req.body;

        console.log("inputData >> "+JSON.stringify(inputData));

        addressController.updateAddress(inputData)
            .then(function(result){
                console.log(result);
                res.send(result);
            }).catch(function(error){
                console.log(error);
                res.send(error);
            });

    });

    /*
        Find Address
     */
    app.post('/getaddress',  cors(corsOptions),  function(req, res) {

        var inputData = req.body;

        console.log("inputData >> "+JSON.stringify(inputData));

        addressController.getAddressDetails(inputData)
            .then(function(result){
                console.log(result);
                res.send(result);
            }).catch(function(error){
            console.log(error);
            res.send(error);
        });

    });



	
	
}

