/**
 * User Operation on Database
 */

var fs 				= require('fs');
var http 			= require('http');
var mongoose 		= require('mongoose');
var express 		= require('express');
var Grid 			= require('gridfs-stream');
var bodyParser 		= require('body-parser');
 
var userSchema 		= require.main.require('./schema/user/user_schema');
var DBConnection 	= require.main.require('./util/DBConnection');

 

module.exports.addUser = function(user_obj) {
	
	return new Promise( function(resolve, reject) {
		
		user_obj.save()
		.then(function(obj) {
				console.log(" addUser obj "+obj);
		 		resolve(obj	)
		})
        .catch(function(error){
        		console.log(" 11 "+error);
            	reject(error)
        });
		 		
	})
	 
}


module.exports.updateUser = function(user_obj) {
	
	console.log(" User Object in updateUser >> "+JSON.stringify(user_obj));
	
	return new Promise( function(resolve, reject) {
		
		user_obj.save()
		.then(function(obj) {
			console.log(" User Object in updateUser"+JSON.stringify(obj));
		 	resolve(obj	)
		})
        .catch(function(error){
        		console.log(" updateMissedLogin "+error);
            	reject(error)
        });
		 		
	})
	 
}



module.exports.findUserbyId = function(userId) {

    return new Promise( function(resolve, reject) {

        userSchema.User.findById(userId)
            .then(function(obj) {
                console.log(" obj in findUserbyId "+obj);
                resolve(obj)
            })
            .catch(function(error){
                console.log(" findUserbyId Error "+error);
                reject(error)
            });

    })

}


module.exports.addPassword = function(password_obj) {
	
	return new Promise( function(resolve, reject) {
		
		password_obj.save()
		.then(function(obj) {
		 		resolve(obj	)
		})
        .catch(function(error){
        		console.log(" password_obj save error "+error);
            	reject(error)
        });
		 		
	})
	 
}


module.exports.updatePassword = function(password_obj) {
	
	return new Promise( function(resolve, reject) {
		
		password_obj.save()
		.then(function(obj) {
		 		resolve(obj	)
		})
        .catch(function(error){
        		console.log(" password_obj update error "+error);
            	reject(error)
        });
		 		
	})
	 
}


module.exports.resetPassword = function(reset_password_obj) {
	
	return new Promise( function(resolve, reject) {
		
		reset_password_obj.save()
		.then(function(obj) {
				console.log(" updated password obj "+obj);
		 		resolve(obj	)
		})
        .catch(function(error){
        		console.log(" password_obj update error "+error);
            	reject(error)
        });
		 		
	})
	 
}

module.exports.validateUserId = function(searchCriteria) {
	
	return new Promise( function(resolve, reject) {
		
		userSchema.User.findOne(searchCriteria)
		.then(function(obj) {
				console.log(" obj in validateUserId "+obj);
		 		resolve(obj)
		})
        .catch(function(error){
        		console.log(" validateUserId Error "+error);
            	reject(error)
        });
		 		
	})
	
}


module.exports.validatePassword = function(searchCriteria) {
	
	return new Promise( function(resolve, reject) {
		
		userSchema.Password.findOne(searchCriteria)
		.then(function(obj) {
				console.log(" obj in validatePassword "+obj);
		 		resolve(obj)
		})
        .catch(function(error){
        		console.log(" validatePassword Error "+error);
            	reject(error)
        });
		 		
	})
	
}

