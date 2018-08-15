/**
 * 
 */

var express				= require('express');
var jwt         		= require('jwt-simple');

var baseSchema 			= require.main.require('./schema/base_schema');
var baseDao 			= require.main.require("./dao/base_dao");
var SessionVariables 	= require.main.require("./util/SessionVariables");

var property 			= require.main.require('./util/DBProperty');
var messages 			= require.main.require('./util/Messages');
var Constants 			= require.main.require("./util/Constants");
var ApiResponse 		= require.main.require("./util/ApiResponse");
var cacheManager 		= require.main.require("./util/CacheManager");
var commonFunctions		= require.main.require("./util/CommonFunctions");


/*
 * module.exports.manageUserToken = function(userid, userObjectId) {
 * 
 * var userObj = "{loggedinIserId:"+userid+"}"; console.log(" user obj
 * "+userObj); var tokenOfuserObj = jwt.encode(userObj,
 * SessionVariables.SESSION_VARIABLE.s);
 * 
 * var userTokenObj = "{\"loggedinIserId\":\""+userid+"\",
 * \"tokenObj\":\""+tokenOfuserObj+"\"}"; console.log(" userTokenObj obj
 * "+userTokenObj); var userToken = jwt.encode(userTokenObj,
 * SessionVariables.SESSION_VARIABLE.s);
 *  // Create Screen Object var liveUsers_obj = new
 * applicationSchema.LiveUsers({ userName : userid, userId : userObjectId,
 * numberOfDegit : 10, token : tokenOfuserObj });
 * 
 * var conditions = { userName : userid };
 *  // First Delete Live users applicationDao.deleteLiveUser(conditions);
 * 
 * console.log(" conditions "+conditions); // Add Live Users
 * applicationDao.addLiveUser(liveUsers_obj);
 * 
 * console.log(" liveUsers_obj "+liveUsers_obj);
 * 
 * return userToken; }
 */


module.exports.manageUserToken = function(userid, userObjectId, ip) {
	
	
	var userObj = "{loggedinIserId:"+userid+"}";
	console.log(" 111 user obj "+userObj);
	var tokenOfuserObj = jwt.encode(userObj, SessionVariables.SESSION_VARIABLE.s);
	
	var userTokenObj = "{\"loggedinIserId\":\""+userid+"\", \"tokenObj\":\""+tokenOfuserObj+"\"}";
	console.log(" 222 userTokenObj obj "+userTokenObj);
	var userToken = jwt.encode(userTokenObj, SessionVariables.SESSION_VARIABLE.s);
	
	return new Promise( function(resolve, reject) {
		
		// Create Session Object
		var liveUsers_obj = new baseSchema.LiveUsers({
			
			userName 		: userid,
			userId			: userObjectId,
			numberOfDegit 	: 10,
			token		  	: tokenOfuserObj,
			ip				: ip,
			lastAccesedAt	: new Date()
			
		});
		
		// Condition to delete existing user if present
		var conditions = {
				userName : userid
		};
		
		baseDao.deleteLiveUser(conditions)
		.then(function(deletedUserObj) {

			baseDao.addLiveUser(liveUsers_obj)
			
			.then(function(liveUserObj) {
				resolve(
		 				new ApiResponse({
		 					success : false,
		 					extras 	: liveUserObj,
		 					token  	: userToken
		 				})	
	       	 	)
			})
			.catch(function(error){
				console.log(" error 111 "+error);
				reject(
		 				new ApiResponse({
		 					success : false,
		 					extras : JSON.parse(messages.E_LIVE_USER_ADD_FAIL)
		 				})	
	       	 	)
			 });
			
		})
		.catch(function(error){
			console.log(" error 222 "+error);
			reject(
	 				new ApiResponse({
	 					success : false,
	 					extras : JSON.parse(messages.E_LIVE_USER_ADD_FAIL)
	 				})	
       	 	)
		 });
		
		
	})
	
}





module.exports.deleteUserToken = function(userId,userName) {
	
 
	
	return new Promise( function(resolve, reject) {
	 
		
		// Condition to delete existing user if present
		var conditions = {
				userId : userId,
				userName : userName
				
		};
		
		baseDao.deleteLiveUser(conditions)
		.then(function(liveUserObj) {
				resolve(
		 				new ApiResponse({
		 					success : false,
		 					extras 	: liveUserObj,
		 					token  	: userToken
		 				})	
	       	 	)
		})
		.catch(function(error){
			console.log(" error 111 "+error);
			reject(
	 				new ApiResponse({
	 					success : false,
	 					extras : JSON.parse(messages.E_LIVE_USER_DELETION_FAIL)
	 				})	
       	 	)
		 });
		 
	})
	
}




