/**
 * 
 */
var express 	= require('express');
var http 		= require('http');
var connect 	= require("connect");
var uuid 		= require('node-uuid');
var mongoose 	= require('mongoose');
var otpGenerator 	= require('otp-generator');


var ApiResponse 	= require.main.require("./util/ApiResponse.js");
var messages 		= require.main.require("./util/Messages.js");
var mailSender 		= require.main.require('./util/MailSender');
var smsSender 		= require.main.require('./util/SMSSender');

var applicationDao 		= require.main.require("./dao/application_dao");
var systemUserDao 		= require.main.require("./dao/user/system_user_dao");


const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 120, checkperiod: 121 } );

/**
 * Method to Upload Image
 * 
 */
module.exports.uploadfile = function(file, callback) {
	applicationDao.uploadImage(file, function(err, obj) {

		if (err) {
			console.log("err " + err);
			return callback(err, new ApiResponse({
				success : false,
				extras : "Error is here"
			}));
		} else {
			console.log("File uploaded Saved Successfully ");
			console.log(" File is  " + obj);
			console.log(" File id is  " + obj._id);
			return callback(err, new ApiResponse({
				success : true,
				extras : obj
			}));
		}

	});
}

/**
 * Method to get Image
 */
module.exports.getImage = function(fileid, req, res, callback) {
	applicationDao.getImage(fileid, req, res, function(err, obj) {

		if (err) {
			console.log("err " + err);
			return callback(err, new ApiResponse({
				success : false,
				extras : "Error is here"
			}));
		}  
	});
}

/**
 * Method t oDelete Image
 */
module.exports.deleteImage = function(fileid, req, res , callback) {
	
	applicationDao.getMappingObject({imageId : fileid}, function(err, obj) {

		if (err) {
			return callback(err, new ApiResponse({
				success : false,
				extras : "Error is here"
			}));
		} else {
			
			if (obj && obj[0] && obj[0].imagePath && fileid) {
				// Delete Image
				applicationDao.deleteImage(fileid, obj[0].imagePath, req, res);

				 // Delete Image Mapping File
				applicationDao.removeImageMappingObject({imageId : fileid});

				return callback(err, new ApiResponse({
					success : true,
					extras : obj
				}));
			} else {
				
				return callback(err, new ApiResponse({
					success : true,
					extras : obj
				}));
			}
			
		}

	});

}


/**
 * Delete Array of Image
 */
module.exports.deleteArrayOfImage = function(fileidArray, req, res , callback) {
	
	var errorFlag = false;
	var errorObj  = "";
	
	if (fileidArray.length == 0) {
		return callback(errorObj, new ApiResponse({
			success : true,
			extras : "Image Removed Syccessfully"
		}));
		
	} else {
		
		for (var i = 0; i < fileidArray.length; i++) {
			
			fileid = fileidArray[i];
			
			applicationDao.getMappingObject({imageId : fileid}, function(err, obj) {

				if (err) {
					
					errorFlag = true;
					errorObj = err;
					
				} else {
					
					if (obj && obj.length > 0) {
						// Delete Image
						applicationDao.deleteImage(fileid, obj[0].imagePath, req, res);

						 // Delete Image Mapping File
						applicationDao.removeImageMappingObject({imageId : fileid});
					}
					

					 
				}

			});
		 
		}
		
	}
	 
	 
	if (!errorFlag) {
		return callback(errorObj, new ApiResponse({
			success : false,
			extras : "Error is here"
		}));
	} else {
		return callback(errorObj, new ApiResponse({
			success : true,
			extras : "Image Removed Syccessfully"
		}));
	}

}

 

/**
 * Get logged in user details
 * 
 */
module.exports.getLoggedinUserDetails = function(userid, callback) {
	
	console.log(" userid is "+JSON.stringify(userid));
	
	var condition = {userName : userid};
	
	applicationDao.getLoggedInUserDetails(condition, function(err, obj) {


		if (err) {
			console.log("err " + err);
			return callback(err, new ApiResponse({
				success : false,
				extras : "System has an Exception !!"
			}));
		}

		if (obj.length == 0) {
			return callback(err, new ApiResponse({
				success : false,
				extras 	: JSON.parse(messages.E_ADMIN_LOGIN_FAILURE)
			}));

		} else {	
						
			return callback(err, new ApiResponse({
				success : true,
				extras : obj
			}));
			
		}
	});
}


 

/**
 * Get logged in user details
 * 
 */

/*
module.exports.updateAdminDetailsForpasswordReset = function(body, callback) {
	
	var suppliedOTP = body.otp;
	
	if (body.username.length > 0 && suppliedOTP.length > 0) {
		
		var storedOTP = myCache.get(body.username);
		
		
		if (suppliedOTP === storedOTP) {
 
	
			var condition = {userEmail : body.username, contactNumber : body.contactnumber};
			
			adminDao.getAdminDetailsforPasswordReset(condition, function(err, obj) {
		
		
				if (err) {
					console.log("err " + err);
					return callback(err, new ApiResponse({
						success : false,
						extras : "System has an Exception !!"
					}));
				}
		
				if (obj.length == 0) {
					return callback(err, new ApiResponse({
						success : false,
						extras 	: JSON.parse(messages.E_ADMIN_LOGIN_FAILURE)
					}));
		
				} else {	
								
					var adminuserobj  = obj[0];
					adminuserobj.userPassword = uuid.v4().substring(0, 8);
					adminuserobj.firsttimeuser = "YES";
					
		
					adminDao.updateAdminUser(adminuserobj, function(err, updatdeadminuserobj) {
		
						if (err) {
							console.log("err " + err);
							return callback(err, new ApiResponse({
								success : false,
								extras : "Error is here"
							}));
						} else {
							
							mailSender.sendPassword("",updatdeadminuserobj.userEmail,updatdeadminuserobj.userPassword);
							
							smsSender.sendPasswordonSMS(updatdeadminuserobj.contactNumber,updatdeadminuserobj.userPassword);
							
							return callback(err, new ApiResponse({
								success : true,
								extras : updatdeadminuserobj
							}));
						}
		
					});
					
				}
			});
	


		} else {
					
					return callback(null, new ApiResponse({
						success : false,
						extras : "Error is here",
						message : "OTP do not match !! please try again later !!"
					}));
		}
				
	} else {
		
		return callback(null, new ApiResponse({
			success : false,
			extras : "Error is here",
			message : "User data is not available !! Please try again later !!"
		}));
	}
			
}

 */

/**
 * Get logged in user details
 * 
 */

/*

module.exports.verifyadminandgenerateOTP = function(body, callback) {
	
	var condition = {userEmail : body.username, contactNumber : body.contactnumber};
	
	adminDao.getAdminDetailsforPasswordReset(condition, function(err, obj) {


		if (err) {
			console.log("err " + err);
			return callback(err, new ApiResponse({
				success : false,
				extras : "System has an Exception !!"
			}));
		}

		if (obj.length == 0) {
			return callback(err, new ApiResponse({
				success : false,
				extras 	: JSON.parse(messages.E_ADMIN_LOGIN_FAILURE)
			}));

		} else {	
						
			var adminobj  = obj[0];
			
			var otp = otpGenerator.generate(4, {digits:true,  upperCase: false, specialChars: false });
			
			myCache.set( adminobj.userEmail , otp, function( err, success ){
				  if( !err && success ){
				    console.log( success );
				  }
			});
			
			smsSender.sendOTPonSMS(adminobj.contactNumber,otp);
			
			return callback(err, new ApiResponse({
				success : true,
				extras : adminobj
			})); 
			
		}
	});
}
*/



/**
 * userId : String, userName : String, userPassword : String, userStatus :
 * String, firsttimeuser : String, createdOn : String
 * 
 */

module.exports.logoutUser = function(body, callback) {

	var conditions = {
		userName : body.username 
	};

	applicationDao.deleteLiveUser(conditions, function(err, obj) {

		if (err) {

			console.log("err " + err);
			return callback(err, new ApiResponse({
				success : false,
				extras : "System has an Exception !!"
			}));
		}

		if (obj.length == 0) {

			return callback(err, new ApiResponse({
				success : false,
				extras : JSON.parse(messages.E_ADMIN_LOGOUT_FAILURE)
			}));

		} else {
 
			return callback(err, new ApiResponse({
				success : true,
				extras : obj
			}));
  
		}
	});

}




