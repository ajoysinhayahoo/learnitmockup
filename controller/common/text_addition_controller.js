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

var textSchema          = require.main.require('./schema/common/text_details_schema');
var textDao 	        = require.main.require("./dao/common/text_details_dao");


/**
 * Create Text Content
 *
 * @param {} body
 */
module.exports.addTextContent = function(body) {

    return new Promise( function(resolve, reject) {

        // Create User Object
        var text_obj = new textSchema.Text({

            text 			        : body.text,
            status                  : Constants.TEXT_NEW

        });

        textDao.addText(text_obj)
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
                        extras : JSON.parse(messages.ADDRESS_ADD_ERROR)
                    })
                )
            });
    })
}




/**
 * Get Text Content
 *
 * @param {} body
 */
module.exports.getTextContent = function(textId) {

    return new Promise( function(resolve, reject) {


        textDao.getTextById(textId)
            .then(function(obj) {
                console.error(' OBJ :: ', JSON.stringify(obj));
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
                        extras : JSON.parse(messages.ADDRESS_ADD_ERROR)
                    })
                )
            });



    })
}

