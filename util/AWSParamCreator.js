/**
 * 
 */
var express 			= require('express');
var http 				= require('http');
var connect 			= require("connect");
var fs 					= require('fs');
var mongoose 			= require('mongoose'); 

var AWSconstants 		= require.main.require("./util/AWSConstants"); 
 
module.exports.createParam = function (module, bucket, fileName, userId, filepath ,acl ) {
    
	var param = {};

    if (bucket != undefined && bucket != "") {
        param.Bucket = bucket;
    }

    if (userId != undefined && userId != "") {
        param.Key 	= userId + "/" + fileName;
    } else {
        if (fileName != undefined && fileName != "") {
            param.Key 	= fileName;
        }
    }

    if (filepath != undefined && filepath != "") {
        param.Body 	= fs.readFileSync(filepath);
    }


	if (acl != undefined && acl != "") {
        param.ACL 	= AWSconstants.security;
    } else {
        param.ACL 	= "PRIVATE";
    }

	return param;

};
 

module.exports.imageNameCreator = function (module, fileName) {
    
	var param = {};
	 
	if (module === AWSconstants.serviceImagesModule) {
		param.Bucket = AWSconstants.serviceImageBucketName; 
	} else if (module === AWSconstants.productImagesModule) {
		param.Bucket = AWSconstants.productImageBucketName; 
	} else if (module === AWSconstants.workerImagesModule) {
		param.Bucket = AWSconstants.workerImageBucketName;
	} else if (module === AWSconstants.websiteAddImagesModule) {
		param.Bucket = AWSconstants.websiteAddImageBucketName;
	} else if (module === AWSconstants.salesAddImagesModule) {
		param.Bucket = AWSconstants.salesAddImageBucketName;
	} else if (module === AWSconstants.categoryImagesModule) {
		param.Bucket = AWSconstants.categoryImageBucketName;
	} else if (module === AWSconstants.subCategoryImagesModule) {
		param.Bucket = AWSconstants.subCategoryImageBucketName;
	}  
	
	
 

	return param;

};
 
  
