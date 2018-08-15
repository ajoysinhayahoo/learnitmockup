/**
 * 
 */


var express 			= require('express');
var http 				= require('http');
var connect 			= require("connect");
var fs 					= require('fs');
var jwt         		= require('jwt-simple');
var uuid 				= require('node-uuid');
var autoIncrement 		= require('mongoose-auto-increment');
var microtime 			= require('microtime')
var bcrypt   			= require('bcrypt-nodejs');

const uuidv4 			= require('uuid/v4');

var systemUserSchema 	= require.main.require('./schema/user/system_user_schema');
var applicationSchema 	= require.main.require('./schema/application_schema');

var property 			= require.main.require('./util/DBProperty');
var Constants 			= require.main.require("./util/Constants");
var commonFunctions		= require.main.require("./util/CommonFunctions");
var messages 			= require.main.require('./util/Messages');
var ApiResponse 		= require.main.require('./util/ApiResponse');
var SessionVariables 	= require.main.require('./util/SessionVariables');
var mailSender 			= require.main.require('./util/MailSender');
var cacheManager 		= require.main.require("./util/CacheManager");

var systemUserDao 		= require.main.require("./dao/user/system_user_dao");
var applicationDao 		= require.main.require("./dao/application_dao");
var userDao 			= require.main.require("./dao/user/user_dao");

var baseController 		= require.main.require("./controller/base_controller");



/**
 * 	userId			: String,
	userName		: String,
	userPassword	: String,
	userStatus 		: String,
	firsttimeuser	: String,
	createdOn		: String
 * 
 */
module.exports.addAdminUser = function() {

	var conditions = {
			userId : property.ADMIN_USER_NAME
	};
	
	return new Promise( function(resolve, reject) {


        systemUserDao.validateAdminUserId(conditions)
		.then(function(obj) {

			if (obj == null){
					
					// Create User Object
					var user_obj = new systemUserSchema.SystemUser({

						userId 			: property.ADMIN_USER_NAME,
						firstName		: property.ADMIN_USER_F_NAME,
						lastName 		: property.ADMIN_USER_L_NAME,
						userEmail		: property.ADMIN_EMAIL,
						contactNumber	: property.ADMIN_CONTACT_NUMBER,
						userType		: Constants.USER_ADMIN
						 
					});
					
					// Create Password Object
					var pwd_obj = new systemUserSchema.SuPwdScm({

						password 			: commonFunctions.generateHash(property.ADMIN_USER_PASSWORD),
						lastPasswordChange 	: new Date()
						 
					});


                	systemUserDao.addAdminUser(user_obj)
					.then(function(userObj) {
						
						
						// Set user id to password object
						pwd_obj.userId = userObj._id;

                        systemUserDao.addAdminPassword(pwd_obj)
						.then(function(passwordObj) {
							resolve(
					 				new ApiResponse({
					 					success : true,
					 					extras : obj
					 				})	
					 		)
						})
						.catch(function(error){
			            	  
			            	 reject(
			 		 				new ApiResponse({
			 		 					success : false,
			 		 					extras : JSON.parse(messages.E_SYSTEM_ERROR)
			 		 				})	
			            	 )
						 });
					})	
					.catch(function(error){
			            	 
			            	 reject(
			 		 				new ApiResponse({
			 		 					success : false,
			 		 					extras : JSON.parse(messages.E_SYSTEM_ERROR)
			 		 				})	
			            	 )
						 });
					
					 
				} else {
					
					
					resolve(
	 		 				new ApiResponse({
	 		 					success : false,
	 		 					extras : JSON.parse(messages.USER_ID_PRESENT)
	 		 				})	
	            	 )
				}
		 		
		})
        .catch(function(error){
            	 
        		 console.log(" Error is "+error);
            	 reject(
 		 				new ApiResponse({
 		 					success : false,
 		 					extras : JSON.parse(messages.USER_ID_NOT_PRESENT)
 		 				})	
            	 )
         });
         
	})
 
}




/**
 * validateUserId
 */
module.exports.validateSystemUserId = function(body) {
	
	var conditions = {
			userId : body.userId
	};
	
	console.log(" conditions >> "+JSON.stringify(conditions));
	
	return new Promise( function(resolve, reject) {
		
		systemUserDao.validateAdminUserId(conditions)
		.then(function(obj) {
				
				console.log(" obj >> "+JSON.stringify(obj));
				
				if (obj != null){
					// set userId in cache
					var reference = microtime.now();
					
					console.log(" reference >> "+JSON.stringify(reference));
					
					if (cacheManager.setUserLoginCache(reference,obj)) {
						resolve(
				 				new ApiResponse({
				 					success : true,
				 					reference : reference,
				 					extras : obj
				 				})	
				 		)
					}
					else {
						reject(
		 		 				new ApiResponse({
		 		 					success : false,
		 		 					extras : JSON.parse(messages.E_SYSTEM_ERROR)
		 		 				})	
		            	 )
					}
					 
				} else {
					reject(
	 		 				new ApiResponse({
	 		 					success : false,
	 		 					extras : JSON.parse(messages.USER_ID_NOT_PRESENT)
	 		 				})	
	            	 )
				}
		 		
		})
        .catch(function(error){
            	  
            	 reject(
 		 				new ApiResponse({
 		 					success : false,
 		 					extras : JSON.parse(messages.E_SYSTEM_ERROR)
 		 				})	
            	 )
         });
         
	})
	
	
}



/**
 * check password
 */
module.exports.validateSystemPassword = function(body) {
	
	var userObj = cacheManager.getUserLoginCache(body.reference);
	
	console.log(" userObj is >> "+JSON.stringify(userObj));
	
	return new Promise( function(resolve, reject) {
		
		if ( userObj == undefined ){
			
			reject(
		 				new ApiResponse({
		 					success : false,
		 					extras : JSON.parse(messages.LOGIN_ERROR)
		 				})	
        	 )
        	 
		} else {
			
			
			console.log(" hash 1 >> "+commonFunctions.generateHash(property.ADMIN_USER_PASSWORD));
			console.log(" hash 2 >> "+commonFunctions.generateHash(body.password));
			
			var conditions = {
					userId	 	: userObj._id
					//password 	: commonFunctions.generateHash(body.password)
			};
			
			console.log(" conditions for pwd check is >> "+JSON.stringify(conditions));
			
			systemUserDao.validateSystemUserPassword(conditions)
			.then(function(passwordObj) {
				if (passwordObj != null){
					 
					// If error occured then delete cache
					if (commonFunctions.validateHash(body.password, passwordObj.password)) {
						resolve(
				 				new ApiResponse({
				 					success : true,
				 					extras : userObj
				 				})	
				 		)
					} else {
						reject(
		 		 				new ApiResponse({
		 		 					success : false,
		 		 					extras : JSON.parse(messages.USER_ID_PASSWORD_NOT_MATCHED)
		 		 				})	
		            	 )
					}
					
			 		
				} else {
					
					reject(
	 		 				new ApiResponse({
	 		 					success : false,
	 		 					extras : JSON.parse(messages.USER_ID_PASSWORD_NOT_MATCHED)
	 		 				})	
	            	 )
					
	            	 
				}
			})
			.catch(function(error){
		 
            	 reject(
 		 				new ApiResponse({
 		 					success : false,
 		 					extras : JSON.parse(messages.E_SYSTEM_ERROR)
 		 				})	
            	 )
			 });
			
		}
		
		 
         
	})
	
	
}






/**
 * 	userId			: String,
	userName		: String,
	userPassword	: String,
	userStatus 		: String,
	firsttimeuser	: String,
	createdOn		: String
 * 
 */
module.exports.resetUserPassword = function(body) {
	
	var userCond = {
			userEmail 		: body.userEmail,
			contactNumber 	: body.contactNumber,
			userId 			: body.userId,
			userType 		: body.userType
	};
	
	return new Promise( function(resolve, reject) {
		
		userDao.validateUserId(userCond)
		
		.then(function(userObj) {
			
			console.log(" USER OBJECT IS >> "+userObj);
			
			if (userObj != null){
				
				var condition = {
						userId 	: userObj._id 
				};
				
				userDao.validatePassword(condition)
				.then(function(passwordObj) {
					
					if (passwordObj != null){
						 
						var randomPassword = uuidv4().replace("-","").substring(0,6);
						
						console.log(" NEW PASSWORD IS >> "+randomPassword);
						
						passwordObj.password = commonFunctions.generateHash(randomPassword);
						passwordObj.lastPasswordChange = new Date();
						
						userDao.updatePassword(passwordObj)
						.then(function(updPasswordObj) {
							 
							// Set user first time login = true
							userObj.firstTimeLogin 	= true;
							userObj.firsttimeuser 	= "YES";
							
							console.log(" userObj IS >> "+userObj);
							
							userDao.updateUser(userObj)
							.then(function(updatedUserObj) {
								resolve(
						 				new ApiResponse({
						 					success : true,
						 					extras : updatedUserObj
						 				})	
						 		)
							})
							.catch(function(error){
				            	 reject(
					 		 				new ApiResponse({
					 		 					success : false,
					 		 					extras : JSON.parse(messages.E_SYSTEM_ERROR)
					 		 				})	
					            	 )
							});
							
						})
						.catch(function(error){
			            	 reject(
			 		 				new ApiResponse({
			 		 					success : false,
			 		 					extras : JSON.parse(messages.E_SYSTEM_ERROR)
			 		 				})	
			            	 )
						 });
						
					}
					 
					 
				})
				.catch(function(error){
			      	  
			       	 reject(
				 				new ApiResponse({
				 					success : false,
				 					extras : JSON.parse(messages.USER_ID_PASSWORD_NOT_MATCHED)
				 				})	
			       	 )
			    });
				
			}
		})
		
		.catch(function(error){
      	  
	       	 reject(
		 				new ApiResponse({
		 					success : false,
		 					extras : JSON.parse(messages.USER_ID_PASSWORD_NOT_MATCHED)
		 				})	
	       	 )
	    });
		
	})
	
}



