/**
 * This is to control all user management
 */
var express 	= require('express');
var http 		= require('http');
var connect 	= require("connect");
var uuid 		= require('uuid');
var mongoose 	= require('mongoose');
var q 			= require('q');
var microtime 	= require('microtime')
var bcrypt   	= require('bcrypt-nodejs');


const uuidv4 	= require('uuid/v4');

var property 			= require.main.require('./util/DBProperty');
var messages 			= require.main.require('./util/Messages');
var Constants 			= require.main.require("./util/Constants");
var ApiResponse 		= require.main.require("./util/ApiResponse");
var cacheManager 		= require.main.require("./util/CacheManager");
var commonFunctions		= require.main.require("./util/CommonFunctions");

var baseController 		= require.main.require("./controller/base_controller");

// Module Specific
var userSchema 		= require.main.require('./schema/user/user_schema');
var userDao 		= require.main.require("./dao/user/user_dao");

var imageDetailsDao = require.main.require("./dao/common/image_details_dao");

/**
 * This is add user !! This will cover all kind of users !!
 * 
 * 
 * @param {} body 
 */
module.exports.addUser = function(body) {
	
	return new Promise( function(resolve, reject) {
		
		// Create User Object
		var user_obj = new userSchema.User({

			firstName 		: body.firstName,
			lastName 		: body.lastName,
			userEmail		: body.userEmail,
			contactNumber	: body.contactNumber,
			userType		: body.userType
			 
		});
		
		// Create Password Object
		var pwd_obj = new userSchema.Password({

			password 			: commonFunctions.generateHash(body.password),
			lastPasswordChange 	: new Date()
			 
		});
		
		// Set user password random number
		user_obj.userPassword 
									= uuidv4().replace("-","").substring(0,6);
		user_obj.emailVerifierKey 
									= uuidv4().replace("-","").substring(0,6);
		user_obj.contactVerifierKey 
									= uuidv4().replace("-","").substring(0,4);
		
		userDao.addUser(user_obj)
		.then(function(userObj) {
			// Set user id to password object
			pwd_obj.userId = userObj._id;

			userDao.addPassword(pwd_obj)
			.then(function(passwordObj) {
				resolve(
		 				new ApiResponse({
		 					success : true,
		 					extras : userObj
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
        	 	console.error(' ERROR :: ', error); 
            	 reject(
 		 				new ApiResponse({
 		 					success : false,
 		 					extras : JSON.parse(messages.E_MAILID_ALREADY_REGISTERED)
 		 				})	
            	 )
         });
         
	})
	
	
}



/**
 * validateUserId
 */
module.exports.validateUserId = function(body) {
	
	var conditions = {
			userEmail : body.userId
	};
	
	return new Promise( function(resolve, reject) {
		
		userDao.validateUserId(conditions)
		.then(function(userObj) {
			
			if (userObj != null){
				
				// set userId in cache
				var reference = microtime.now();
				
				if (cacheManager.setUserLoginCache(reference,userObj)) {
					resolve(
			 				new ApiResponse({
			 					success : true,
			 					reference : reference,
			 					extras : userObj
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
 		 					extras : JSON.parse(messages.USER_ID_NOT_PRESENT)
 		 				})	
            	 )
         });
         
	})
	
	
}



/**
 * check password
 */
module.exports.checkpwd = function(body) {
	
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
					userId : userObj._id
			};
			
			console.log(" conditions for pwd check is >> "+JSON.stringify(conditions));
			
			userDao.validatePassword(conditions)
			.then(function(passwordObj) {
				
				console.log(" passwordObj is >> "+JSON.stringify(passwordObj));
				
				if (passwordObj != null){
					 
					// If error occured then delete cache
					if (commonFunctions.validateHash(body.password, passwordObj.password)) {
						
						console.log("1");
						
						baseController.manageUserToken(userObj.userEmail, userObj._id, body.ip)
						.then(function(liveUserObj) {
							resolve(
					 				new ApiResponse({
					 					success : false,
					 					extras 	: userObj,
					 					token  	: liveUserObj.token
					 				})	
				       	 	)
						})
						.catch(function(error){
							reject(
					 				new ApiResponse({
					 					success : false,
					 					extras : JSON.parse(messages.E_LIVE_USER_ADD_FAIL)
					 				})	
				       	 	)
						 });
						
						 
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
		 
				 console.log(" error is >> "+JSON.stringify(error));
				
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
 * validateupw
 */
module.exports.validateupw = function(body) {
	
	var userCond = {
			userId : body.userId
	};
	
	return new Promise( function(resolve, reject) {
		
		userDao.validateUserId(userCond)
		
		.then(function(userObj) {
			
			console.log(" User Object "+JSON.stringify(userObj));
			
			if (userObj != null){
				
				if (userObj.userStatus == Constants.MAX_LOGIN_FAIL) {
					
					reject(
			 				new ApiResponse({
			 					success : false,
			 					extras : JSON.parse(messages.MAX_LOGIN_FAIL_ERROR)
			 				})	
		       	 	)
					
				} else {
					
					var passCond = {
							userId 		: userObj._id,
							password	: body.password
					};
					
					userDao.validatePassword(passCond)
					.then(function(passwordObj) {
						
						if (passwordObj.length > 0) {
							
							baseController.manageUserToken(userId,userObj._id,body.ip)
							.then(function(liveUserObj) {
								resolve(
						 				new ApiResponse({
						 					success : false,
						 					extras 	: userObj,
						 					token  	: liveUserObj.token
						 				})	
					       	 	)
							})
							.catch(function(error){
								reject(
						 				new ApiResponse({
						 					success : false,
						 					extras : JSON.parse(messages.E_LIVE_USER_ADD_FAIL)
						 				})	
					       	 	)
							 });
							
							 
							
						} else {
							
							var noOfFailedLogin = userObj.failedLogin;
							
							userObj.failedLogin = noOfFailedLogin + 1;
							
							if (noOfFailedLogin == Constants.NO_MAX_LOGIN_FAILURE) {
								userObj.userStatus = Constants.MAX_LOGIN_FAIL;
							}
							
							
							userDao.updateUser(userObj)
							.then(function(userObj) {
								resolve(
						 				new ApiResponse({
						 					success : false,
						 					extras : userObj
						 				})	
					       	 	)
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
		 					extras : JSON.parse(messages.USER_ID_PASSWORD_NOT_MATCHED)
		 				})	
	       	 )
	    });
		
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
module.exports.updateUserPassword = function(body) {
	
	var userCond = {
			userEmail : body.userEmail
	};
	
	return new Promise( function(resolve, reject) {
		
		userDao.validateUserId(userCond)
		
		.then(function(userObj) {
			
			if (userObj != null){
				
				var passCond = {
						userId 	: userObj._id 
				};
				
				userDao.validatePassword(passCond)
				.then(function(passwordObj) {
					
					if (passwordObj != null){
						
						 
						// If error occured then delete cache
						if (commonFunctions.validateHash(body.password, passwordObj.password)) {
						//if (true) {
							
							passwordObj.password = commonFunctions.generateHash(body.newpassword);
							passwordObj.lastPasswordChange = new Date();
							
							userDao.updatePassword(passwordObj)
							.then(function(updPasswordObj) {
								resolve(
						 				new ApiResponse({
						 					success : true,
						 					extras : userObj
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
							
						} else {
							console.log("5");
							reject(
					 				new ApiResponse({
					 					success : false,
					 					extras : JSON.parse(messages.USER_ID_PASSWORD_NOT_MATCHED)
					 				})	
				       	 	)
							
						}
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



/**
 * Change User Status
 */
module.exports.updateUserStatus = function(body) {
	
	var userCond = {
			userId : body.userId
	};
	
	return new Promise( function(resolve, reject) {
		
		userDao.validateUserId(userCond)
		
		.then(function(userObj) {
			
			console.log(" User Object "+JSON.stringify(userObj));
			
			if (userObj != null){
				
				if (userObj.userStatus == Constants.MAX_LOGIN_FAIL) {
					
					reject(
			 				new ApiResponse({
			 					success : false,
			 					extras : JSON.parse(messages.MAX_LOGIN_FAIL_ERROR)
			 				})	
		       	 	)
					
				} else {
					
					if (body.status == Constants.ACTIVE) {
						userObj.userStatus == Constants.ACTIVE;
					} else {
						userObj.userStatus == Constants.INACTIVE;
					}
										
					userDao.updateUser(userObj)
					.then(function(userObj) {
						resolve(
				 				new ApiResponse({
				 					success : true,
				 					extras : userObj
				 				})	
			       	 	)
					})
					.catch(function(error){
						console.log(" error is "+JSON.stringify(error));  
						reject(
				 				new ApiResponse({
				 					success : false,
				 					extras : JSON.parse(messages.USER_ID_PASSWORD_NOT_MATCHED)
				 				})	
			       	 	)
					 });
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
		 					extras : JSON.parse(messages.USER_ID_PASSWORD_NOT_MATCHED)
		 				})	
	       	 )
	    });
		
	})
	
}



/**
 * User Logout
 */
module.exports.userlogout = function(body) {
	
	var userCond = {
			userId : body.userId
	};
	
	return new Promise( function(resolve, reject) {
		
		userDao.validateUserId(userCond)
		
		.then(function(userObj) {
			
			console.log(" User Object "+JSON.stringify(userObj));
			
			if (userObj != null){
				
				baseController.deleteUserToken(userObj._id, userObj.userEmail)
				.then(function(deletedliveUserObj) {
					resolve(
			 				new ApiResponse({
			 					success : false,
			 					extras 	: deletedliveUserObj
			 				})	
		       	 	)
				})
				.catch(function(error){
					reject(
			 				new ApiResponse({
			 					success : false,
			 					extras : JSON.parse(messages.E_LIVE_USER_DELETION_FAIL)
			 				})	
		       	 	)
				 });
				
				
				
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
		 					extras : JSON.parse(messages.USER_ID_PASSWORD_NOT_MATCHED)
		 				})	
	       	 )
	    });
		
	})
	
}




/**
 * User Logout
 */
module.exports.userCleanup = function() {
	
	var cutoff = new Date();
	cutoff.setDate(cutoff.getDate()-1); // Delete one day old users
	
	var condition = {
			lastAccesedAt : {$gte : cutoff}
	};
	
	new Promise( function(resolve, reject) {
		
		baseDao.deleteLiveUser(conditions)
		.then(function(userObj) {
			resolve(
	 				new ApiResponse({
	 					success : true,
	 					extras : userObj
	 				})	
       	 	)
		})
		.catch(function(error){
			console.log(" error is "+JSON.stringify(error));  
			reject(
	 				new ApiResponse({
	 					success : false,
	 					extras : JSON.parse(messages.USER_ID_PASSWORD_NOT_MATCHED)
	 				})	
       	 	)
		 });
		 
		
	})
	
}



/**
 * This is to Update User Image
 *
 *
 * @param {} body
 */
module.exports.updateUserImage = function(body) {

    var userId              = body.userId;
    var imageId            = body.imageId;

    return new Promise( function(resolve, reject) {

        imageDetailsDao.getImageDetailsById(imageId)
            .then(function(imageObj){

                userDao.findUserbyId(userId)
                    .then(function(userObj){

                        userObj.image       =  imageObj._id;
                        userObj.imageUrl    =  imageObj.url;

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
                                        extras : JSON.parse(messages.USER_ID_NOT_PRESENT)
                                    })
                                )
                            });
                    })
                    .catch(function(error){
                        reject(
                            new ApiResponse({
                                success : false,
                                extras : JSON.parse(messages.USER_ID_NOT_PRESENT)
                            })
                        )
                    });

            })
            .catch(function(error){
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.IMAGE_NOT_FOUND)
                    })
                )
            })

    })
}