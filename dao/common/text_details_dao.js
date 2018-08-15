/**
 * User Operation on Database
 */

var fs 				= require('fs');
var http 			= require('http');
var mongoose 		= require('mongoose');
var express 		= require('express');
var Grid 			= require('gridfs-stream');
var bodyParser 		= require('body-parser');
 
var textSchema 	        = require.main.require('./schema/common/text_details_schema');
var DBConnection 		= require.main.require('./util/DBConnection');
var log          		= require.main.require('./util/log');

/*
Add new taxt content
 */
module.exports.addText = function(text_obj) {
	
	return new Promise( function(resolve, reject) {

        text_obj.save()
		.then(function(obj) {
		 		resolve(obj	)
		})
        .catch(function(error){
            	reject(error)
        });

	})
	 
}


/*
Update Existing taxt content
 */
module.exports.updateText = function(update_obj) {

    return new Promise( function(resolve, reject) {

        update_obj.save()
            .then(function(obj) {
                resolve(obj	)
            })
            .catch(function(error){
                reject(error)
            });

    })

}

/*
Delete taxt content
 */
module.exports.deleteText = function(textId) {

    return new Promise( function(resolve, reject) {

        textSchema.Text.findById(textId).remove()
            .then(function(obj) {
                resolve(obj	)
            })
            .catch(function(error){
                reject(error)
            });

    })

}

/*
Get Existing taxt content
 */
module.exports.getTextById = function(textId) {

    return new Promise( function(resolve, reject) {

        textSchema.Text.findById(textId)
            .then(function(obj) {
                console.log(" Text Object in getTextById"+JSON.stringify(obj));
                resolve(obj	)
            })
            .catch(function(error){
                console.log(" Text Object in getTextById "+JSON.stringify(obj));
                reject(error)
            });

    })

}