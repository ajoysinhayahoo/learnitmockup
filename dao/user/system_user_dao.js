/**
 * 
 */



var fs 				= require('fs');
var http 			= require('http');
var mongoose 		= require('mongoose');
var express 		= require('express');
var Grid 			= require('gridfs-stream');
var bodyParser 		= require('body-parser');

var systemUserSchema = require.main.require('./schema/user/system_user_schema');
var basedao 		= require.main.require('./dao/base_dao');

var gfs;

var responseObj = basedao.responseObj;

// create application/json parser
var app 			= express();
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({
	extended : true
}));




module.exports.addAdminUser = function(user_obj) {

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


module.exports.updateAdminUser = function(user_obj) {

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


module.exports.addAdminPassword = function(password_obj) {

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


module.exports.updateAdminPassword = function(password_obj) {

    return new Promise( function(resolve, reject) {

        password_obj.update()
            .then(function(obj) {
                resolve(obj	)
            })
            .catch(function(error){
                console.log(" password_obj update error "+error);
                reject(error)
            });

    })

}

module.exports.validateAdminUserId = function(searchCriteria) {

    return new Promise( function(resolve, reject) {

        systemUserSchema.SystemUser.findOne(searchCriteria)
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


module.exports.validateSystemUserPassword = function(searchCriteria) {

    return new Promise( function(resolve, reject) {

        systemUserSchema.SuPwdScm.findOne(searchCriteria)
            .then(function(obj) {
                resolve(obj)
            })
            .catch(function(error){
                console.log(" validatePassword Error "+error);
                reject(error)
            });

    })

}


/*
module.exports.addAdminUser = function(adminUser_obj, callback) {
	adminUser_obj.save(adminUser_obj,callback);
}

module.exports.updateAdminUser = function(adminUser_obj, callback) {
	adminUser_obj.save(adminUser_obj,callback);
}

module.exports.getAdminUserDetails = function(searchCriteria, callback) {
	userSchema.SystemUser.find(searchCriteria).exec(callback);
}

module.exports.getAdminDetailsforPasswordReset = function(searchCriteria, callback) {
	userSchema.SystemUser.find(searchCriteria).exec(callback);
}
*/

/*

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

 */




