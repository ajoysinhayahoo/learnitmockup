/**
 * User Operation on Database
 */

var fs 				= require('fs');
var http 			= require('http');
var mongoose 		= require('mongoose');
var express 		= require('express');
var Grid 			= require('gridfs-stream');
var bodyParser 		= require('body-parser');
 
var videoDetailsSchema 	= require.main.require('./schema/common/video_details_schema');
var DBConnection 		= require.main.require('./util/DBConnection');
var log          		= require.main.require('./util/log');


module.exports.addVideoDetails = function(vid_obj) {
	
	return new Promise( function(resolve, reject) {

        vid_obj.save()
		.then(function(obj) {
		 		resolve(obj	)
		})
        .catch(function(error){
            	reject(error)
        });

	})
	 
}


module.exports.getVideoDetailsById = function(videoId) {

    return new Promise( function(resolve, reject) {

        videoDetailsSchema.Video.findById(videoId)
            .then(function(obj) {
                console.log(" Video Object in findAddress"+JSON.stringify(obj));
                resolve(obj	)
            })
            .catch(function(error){
                console.log(" Address Object in findAddress "+JSON.stringify(obj));
                reject(error)
            });

    })

}