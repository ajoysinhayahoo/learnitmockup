
var http 			= require('http');
var cors 			= require('cors');
var fs 				= require('fs');
var bodyParser 		= require('body-parser');
var Grid 			= require('gridfs-stream');
var mongoose 		= require('mongoose');
var Excel 			= require("exceljs");
var session 		= require('express-session');
var jwt         	= require('jwt-simple');

var SessionVariables 	= require.main.require("./util/SessionVariables");
var PageURL 			= require.main.require("./util/PageURL");

var baseRouter 			= require.main.require("./router/base_router");

var systemUserController 	= require.main.require("./controller/user/system_user_controller");
var applicationController 	= require.main.require("./controller/application_controller");
var userController 			= require.main.require("./controller/user/user_controller");

var gfs;
var userSession;

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
	

	/*app.all('/changeadminpassword', cors(), function(req, res) {
		
		console.log(" password chnage page called ");
		
		var token = req.query._token;
		 
		if (token) {
			 
			var data = baseRouter.decodeToken(token);
			 
			if ( data instanceof Error ) {
			 
				baseRouter.displayTargetPage(res,"./view/admin/login.htm",zcache);
				 
			} else {
					 
				   applicationController.getLoggedinUserDetails(data.loggedinIserId,function(status, result) {
					   
					     console.log(" result is >>> "+JSON.stringify(result));
					   
						if (result.success) {
							 
							var inputData = req.body;
							 
							adminController.updateAdminUserPassword(inputData, function(status, result) {
								 
								console.log(JSON.stringify(result));
								res.send(result);

							});
							
						} else {
							 
							baseRouter.displayTargetPage(res,"./view/admin/login.htm",zcache);
							
						}
					});
			}
			
			
			
			
		} else {
			baseRouter.displayTargetPage(res,"./view/admin/login.htm",zcache);
		}
		

	});*/
	
	
	/**
	 * Update User Status
	 */
	app.post('/updateuserstatus', cors(), function(req, res) {
		
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
	
	
	/**
	 * used to check login step 1 ( User id present or not )
	 */
	app.post('/admincheck', cors(), function(req, res) {
		
		var inputData = req.body;
	 
		systemUserController.validateSystemUserId(inputData)
		.then(function(result){
			 console.log(result);
			 res.send(result);
	    }).catch(function(error){
	    	 console.log(error);
	    	 res.send(error);
	    });

	});
	
	/**
	 * used to check login step 2 ( password present or not )
	 */
	app.post('/adminallow', cors(), function(req, res) {
		
		var inputData = req.body;
	 
		systemUserController.validateSystemPassword(inputData)
		.then(function(result){
			 console.log(result);
			 res.send(result);
	    }).catch(function(error){
	    	 console.log(error);
	    	 res.send(error);
	    });

	});
	
	
	/**
	 * Need to reset user password by Admin
	 */
	app.post('/resetuserpasswordbyadmin', cors(), function(req, res) {
		
		var inputData = req.body;
	 
		systemUserController.resetUserPassword(inputData)
		.then(function(result){
			 console.log(result);
			 res.send(result);
	    }).catch(function(error){
	    	 console.log(error);
	    	 res.send(error);
	    });

	});
	


}


module.exports.addAdminUser = function() {

    systemUserController.addAdminUser()
	.then(function(result){
		 console.log(result);
    }).catch(function(error){
    	 console.log(error);
    });
	
 
}

