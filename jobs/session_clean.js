/**
 * 
 */

 

var express 			= require('express');
var http 				= require('http');
var connect 			= require("connect");
var fs 					= require('fs');
var mongoose 			= require('mongoose'); 
var property 			= require.main.require('./util/DBProperty');
var messages 			= require.main.require('./util/Messages');
var Constants 			= require.main.require("./util/Constants");


var userController 	= require.main.require("./controller/user/user_controller");

var CronJob 		= require('cron').CronJob;

 module.exports.job = new CronJob({
	  
	  cronTime: Constants.SESSION_CLEAN_SCHEDULE,
	  
	  onTick: function() {
		  
		  return new Promise( function(resolve, reject) {
				
			  userController.userCleanup()
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
		  
		  
	  },
	  
	  start: true
}); 

  
