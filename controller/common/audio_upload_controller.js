/**
 * This is to control all user management
 */
var express 	= require('express');
var http 		= require('http');
var connect 	= require("connect");
var uuid 		= require('uuid');
var mongoose 	= require('mongoose');
var q 			= require('q');

var multer      = require('multer');
var multerS3    = require('multer-s3');
var fs          = require('fs');
var AWS         = require('aws-sdk');

const uuidv4 	= require('uuid/v4');

var messages 			= require.main.require('./util/Messages');
var Constants 			= require.main.require("./util/Constants");
var ApiResponse 		= require.main.require("./util/ApiResponse");
var cacheManager 		= require.main.require("./util/CacheManager");
var commonFunctions 	= require.main.require("./util/CommonFunctions");

var AWSParamCreator     = require.main.require("./util/AWSParamCreator");
var AWSconstants        = require.main.require("./util/AWSConstants");

var audioSchema         = require.main.require('./schema/common/audio_details_schema');
var audioDetailsDao 	= require.main.require("./dao/common/audio_details_dao");

/**
 * Create bucket. Note: bucket name must be unique.
 * Requires only bucketName via body
 *
 *
 * @param {} body
 */
module.exports.uploadAudioFileDetails = function(application, url, type, filename, fileExt, security) {


    return new Promise( function(resolve, reject) {

        var formatterUrl = "https://s3."+AWSconstants.region+".amazonaws.com/"+AWSconstants.bucket+"/"+url;
        var audioDetails_obj = new audioSchema.Audio({

            application 			        : application,
            url 			                : formatterUrl,
            type                			: type,
            filename                		: filename,
            ext			                    : fileExt,
            security                        : security
        });

        audioDetailsDao.addAudioDetails(audioDetails_obj)
            .then(function(obj) {
                resolve(
                    new ApiResponse({
                        success : true,
                        extras : obj
                    })
                )
            })
            .catch(function(error){
                console.error(' ERROR :: ', error);
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.AUDIO_ADD_ERROR)
                    })
                )
            });

    })
}



