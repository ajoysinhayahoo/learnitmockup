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

var imageSchema         = require.main.require('./schema/common/image_details_schema');
var imageDetailsDao 	= require.main.require("./dao/common/image_details_dao");

var credentials         = new AWS.SharedIniFileCredentials({profile: 'ajoykumarsinha@gmail.com'});
AWS.config.credentials  = credentials;
AWS.config.region       = 'ap-south-1';

var s3                  = new AWS.S3();


/**
 * Create bucket. Note: bucket name must be unique.
 * Requires only bucketName via body
 *
 *
 * @param {} body
 */
module.exports.createBucket = function(body) {

    return new Promise( function(resolve, reject) {

        //function (module, bucket, fileName, userId, filepath ,acl )
        var params = AWSParamCreator.createParam("",body.bucketName,"","","",AWSconstants.security)

        s3.createBucket(params, function(err, data) {

            if (err) {
                console.log(" Error is >> "+JSON.stringify(err));
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUBJECT_FETCH_ERROR)
                    })
                )
            } else {
                resolve(
                    new ApiResponse({
                        success : true,
                        extras  : data
                    })
                )
            }
        })


    })
}



/**
 * Create bucket. Note: bucket name must be unique.
 * Requires only bucketName via body
 *
 *
 * @param {} body
 */
module.exports.uploadImageFiles = function(req,res, type, application) {

    var file = req.file;

    console.log(" 1 >> ");

    return new Promise( function(resolve, reject) {

        var upload = multer({

            storage: multerS3({

                s3: s3,

                bucket:  AWSconstants.bucket,
                acl   :  AWSconstants.security,

                limits : {
                    fileSize : Number(Constants.UPLOADED_IMAGE_SIZE)
                },

                metadata: function (req, file, cb) {
                    cb(null, { fieldName: file.fieldname });
                },

                key: function (req, file, cb) {
                    cb(null, Constants.IMAGES + "/" + application + "/" + type + "/" + commonFunctions.removeFileExtention(file.originalname) + "/"+file.originalname)
                }
            })
        }).single('image');

        upload(req, res, function(err, data) {

            console.log(" 2 >> "+JSON.stringify(err));

            if (err) {

                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUBJECT_FETCH_ERROR)
                    })
                )
            } else {

                var fileExt = req.file.originalname.split('.').pop()
                // Create User Object
                var imageDetails_obj = new imageSchema.Image({

                    application 			        : application,
                    url 			                : req.file.location,
                    type                			: type,
                    filename                		: req.file.originalname,
                    ext			                    : fileExt
                });

                imageDetailsDao.addImageDetails(imageDetails_obj)
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
                                extras : JSON.parse(messages.IMAGE_ADD_ERROR)
                            })
                        )
                    });


            }
        })

    })
}



