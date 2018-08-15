/**
 * User Operation on Database
 */

var fs 				= require('fs');
var http 			= require('http');
var mongoose 		= require('mongoose');
var express 		= require('express');
var Grid 			= require('gridfs-stream');
var bodyParser 		= require('body-parser');
 
var audioDetailsSchema 	= require.main.require('./schema/common/audio_details_schema');
var DBConnection 		= require.main.require('./util/DBConnection');
var log          		= require.main.require('./util/log');


module.exports.addAudioDetails = function(audio_obj) {
	
	return new Promise( function(resolve, reject) {

        audio_obj.save()
		.then(function(obj) {
		 		resolve(obj	)
		})
        .catch(function(error){
            	reject(error)
        });

	})
	 
}


module.exports.getAudioDetailsById = function(audioId) {

    return new Promise( function(resolve, reject) {

        audioDetailsSchema.Audio.findById(audioId)
            .then(function(obj) {
                console.log(" Audio Object in getAudioDetailsById"+JSON.stringify(obj));
                resolve(obj	)
            })
            .catch(function(error){
                console.log(" Audio Object in getAudioDetailsById "+JSON.stringify(obj));
                reject(error)
            });

    })

}