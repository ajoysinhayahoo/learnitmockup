/**
 * User Operation on Database
 */

var fs 				= require('fs');
var http 			= require('http');
var mongoose 		= require('mongoose');
var express 		= require('express');
var Grid 			= require('gridfs-stream');
var bodyParser 		= require('body-parser');
 
var imageDetailsSchema 	= require.main.require('./schema/common/image_details_schema');
var DBConnection 		= require.main.require('./util/DBConnection');
var log          		= require.main.require('./util/log');


module.exports.addImageDetails = function(img_obj) {
	
	return new Promise( function(resolve, reject) {

        img_obj.save()
		.then(function(obj) {
		 		resolve(obj	)
		})
        .catch(function(error){
            	reject(error)
        });

	})
	 
}


module.exports.getImageDetailsById = function(imageId) {

    return new Promise( function(resolve, reject) {

        imageDetailsSchema.Image.findById(imageId)
            .then(function(obj) {
                console.log(" Address Object in findAddress"+JSON.stringify(obj));
                resolve(obj	)
            })
            .catch(function(error){
                console.log(" Address Object in findAddress "+JSON.stringify(obj));
                reject(error)
            });

    })

}