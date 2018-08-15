/**
 * User Operation on Database
 */

var fs 				= require('fs');
var http 			= require('http');
var mongoose 		= require('mongoose');
var express 		= require('express');
var Grid 			= require('gridfs-stream');
var bodyParser 		= require('body-parser');

var Constants 		= require.main.require("./util/Constants");
 
const NodeCache 	= require('node-cache');

const userControllerCache 	= new NodeCache();


module.exports.setUserLoginCache = function(reference ,obj) {
	
	console.log(" >>>>> reference >>>"+reference);
	console.log(" >>>>> obj >>> "+obj);
	 
	return userControllerCache.set( reference, obj, Constants.USER_CACHE_ALIVE )
	 
	 
}


module.exports.getUserLoginCache = function(reference,obj) {
 
	return userControllerCache.get( reference )
 
}

module.exports.deleteUserLoginCache = function(userId,obj) {
	
	return new Promise( function(resolve, reject) {
		
		userControllerCache.del( userId )
		.then(function(obj) {
				resolve(obj)
		})
        .catch(function(error){
        		console.log(" getUserLoginCache "+error);
            	reject(error)
        });
		 		
	})
	 
}

