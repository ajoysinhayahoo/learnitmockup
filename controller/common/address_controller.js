/**
 * This is to control all user management
 */
var express 	= require('express');
var http 		= require('http');
var connect 	= require("connect");
var uuid 		= require('uuid');
var mongoose 	= require('mongoose');
var q 			= require('q');


const uuidv4 	= require('uuid/v4');


var messages 			= require.main.require('./util/Messages');
var Constants 			= require.main.require("./util/Constants");
var ApiResponse 		= require.main.require("./util/ApiResponse");
var cacheManager 		= require.main.require("./util/CacheManager");

// Module Specific
var addressSchema       = require.main.require('./schema/common/address_schema');
var commonDao 	        = require.main.require("./dao/common/common_dao");

/**
 * This is to Add New Address
 * 
 * 
 * @param {} body 
 */
module.exports.addAddress = function(body) {
	
	return new Promise( function(resolve, reject) {
		
		// Create User Object
		var address_obj = new addressSchema.Address({

            name 			        : body.name,
            addressline1 			: body.addressline1,
            addressline2			: body.addressline2,
            addressline3			: body.addressline3,
            pincode	                : body.pincode,
            city	                : body.city,
            locality                : body.locality,
            state                   : body.state,
            district                : body.district,
            landmark                : body.landmark,
            status                  : body.status,
            capacity                : body.capacity,
            createBy                : body.createBy

		});

        commonDao.addAddress(address_obj)
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
 * This is to Update Existing Address
 *
 *
 * @param {} body
 */
module.exports.updateAddress = function(body) {

    var addressId = body.addressId;

    return new Promise( function(resolve, reject) {

        commonDao.getAddressById(addressId)
            .then(function(addressObj){

                addressObj.name                     =  body.name;
                addressObj.addressline1             =  body.addressline1;
                addressObj.addressline2             =  body.addressline2;
                addressObj.addressline3             =  body.addressline3;
                addressObj.pincode                  =  body.pincode;
                addressObj.city                     =  body.city;
                addressObj.locality                 =  body.locality;
                addressObj.state                    =  body.state;
                addressObj.district                 =  body.district;
                addressObj.landmark                 =  body.landmark;
                addressObj.status                   =  body.status;
                addressObj.capacity                 =  body.capacity;
                addressObj.updateBy                 =  body.updateBy;
                addressObj.updateAt                 =  new Date();

                commonDao.updateAddress(addressObj)
                    .then(function(updatedAddressObj) {
                        resolve(
                            new ApiResponse({
                                success : true,
                                extras : updatedAddressObj
                            })
                        )
                    })
                    .catch(function(error){
                        console.error(' ERROR :: ', error);
                        reject(
                            new ApiResponse({
                                success : false,
                                extras : JSON.parse(messages.ADDRESS_UPDATE_ERROR)
                            })
                        )
                    });
            })
            .catch(function(error){
                console.error(' ERROR :: ', error);
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.ADDRESS_NOT_FOUND)
                    })
                )
            });
    })
}


/**
 * This is to Get All Training Types (Learning and Training)
 *
 *
 * @param {} body
 */
module.exports.getAllAddress = function(body) {

    var condition = {}

    return new Promise( function(resolve, reject) {

        commonDao.findAddress(condition)
            .then(function(addressList) {
                resolve(
                    new ApiResponse({
                        success : true,
                        extras : addressList
                    })
                )
            })
            .catch(function(error){
                console.error(' ERROR :: ', error);
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.ADDRESS_FETCH_ERROR)
                    })
                )
            });
    })
}




/**
 * This is to Get a Specific Training Category using Category ID
 *
 *
 * @param {} body
 */
module.exports.getAddressDetails = function(body) {

    return new Promise( function(resolve, reject) {

        commonDao.getAddressById(body.addressId)
            .then(function(address) {
                resolve(
                    new ApiResponse({
                        success : true,
                        extras : address
                    })
                )
            })
            .catch(function(error){
                console.error(' ERROR :: ', error);
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.ADDRESS_NOT_FOUND)
                    })
                )
            });
    })
}
















/*
    Manage Subcategory
 */


module.exports.addSubCategory = function(body) {

    return new Promise( function(resolve, reject) {

        // Create User Object
        var subCategory_obj = new trainingSetupSchema.SubCategory({

            category 		: body.category,
            name 			: body.name,
            key 			: body.key,
            desc			: body.desc

        });

        trainingSetupDao.addSubCategory(subCategory_obj)
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
                        extras : JSON.parse(messages.SUB_CATEGORY_ADD_ERROR)
                    })
                )
            });

    })


}

/**
 * This is to Update training Sub Category
 *
 *
 * @param {} body
 */
module.exports.updateSubCategory = function(body) {

    var subCategoryId = body.subCategoryId;

    return new Promise( function(resolve, reject) {

        trainingSetupDao.findSubCategoryById(subCategoryId)
            .then(function(subCategoryObj){

                subCategoryObj.name =  body.name;
                subCategoryObj.desc =  body.desc;

                trainingSetupDao.updateSubCategory(subCategoryObj)
                    .then(function(updatedSubCategoryObj) {
                        resolve(
                            new ApiResponse({
                                success : true,
                                extras : updatedSubCategoryObj
                            })
                        )
                    })
                    .catch(function(error){
                        reject(
                            new ApiResponse({
                                success : false,
                                extras : JSON.parse(messages.SUB_CATEGORY_UPDATE_ERROR)
                            })
                        )
                    });
            })
            .catch(function(error){
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUB_CATEGORY_NOT_FOUND)
                    })
                )
            });
    })
}


/**
 * This is to Update training category Status
 *
 *
 * @param {} body
 */
module.exports.updateSubCategoryStatus = function(body) {

    return new Promise( function(resolve, reject) {

        trainingSetupDao.findSubCategoryById(body.subCategoryId)
            .then(function(subCategoryObj){

                if (body.status == "T") {
                    subCategoryObj.status =  true;
                } else {
                    subCategoryObj.status =  false;
                }

                trainingSetupDao.updateSubCategory(subCategoryObj)
                    .then(function(updatedSubCategoryObj) {
                        resolve(
                            new ApiResponse({
                                success : true,
                                extras : updatedSubCategoryObj
                            })
                        )
                    })
                    .catch(function(error){
                        console.error(' ERROR :: ', error);
                        reject(
                            new ApiResponse({
                                success : false,
                                extras : JSON.parse(messages.SUB_CATEGORY_UPDATE_ERROR)
                            })
                        )
                    });
            })
            .catch(function(error){
                console.error(' ERROR :: ', error);
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUB_CATEGORY_NOT_FOUND)
                    })
                )
            });
    })
}



/**
 * This is to Get All Category
 *
 *
 * @param {} body
 */
module.exports.getAllTrngSubCategoryForCategory = function(body) {

    var condition = {category : body.categoryId}

    return new Promise( function(resolve, reject) {

        trainingSetupDao.findSubCategoryForCategory(condition)
            .then(function(subCategoryList) {
                resolve(
                    new ApiResponse({
                        success : true,
                        extras : subCategoryList
                    })
                )
            })
            .catch(function(error){
                console.error(' ERROR :: ', error);
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUB_CATEGORY_FETCH_ERROR)
                    })
                )
            });
    })
}



/**
 * This is to Get Active Training Category only
 *
 *
 * @param {} body
 */
module.exports.getActiveTrngSubCategoryForCategory = function(body) {

    var condition = {category   : body.categoryId,
                     status     : true}

    return new Promise( function(resolve, reject) {

        trainingSetupDao.findSubCategoryForCategory(condition)
            .then(function(subCategoryList) {
                resolve(
                    new ApiResponse({
                        success : true,
                        extras : subCategoryList
                    })
                )
            })
            .catch(function(error){
                console.error(' ERROR :: ', error);
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUB_CATEGORY_FETCH_ERROR)
                    })
                )
            });
    })
}




/**
 * This is to Get a Specific Training SUB Category using SUB Category ID
 *
 *
 * @param {} body
 */
module.exports.getTrainingSubCategoryDetails = function(body) {

    return new Promise( function(resolve, reject) {

        trainingSetupDao.findSubCategoryById(body.subCategoryId)
            .then(function(subCategory) {
                resolve(
                    new ApiResponse({
                        success : true,
                        extras  : subCategory
                    })
                )
            })
            .catch(function(error){
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUB_CATEGORY_FETCH_ERROR)
                    })
                )
            });
    })
}










/*
    Manage Subjects
 */


module.exports.addSubject = function(body) {

    return new Promise( function(resolve, reject) {

        // Create User Object
        var subject_obj = new trainingSetupSchema.Subject({

            category 		: body.category,
            subcategory 	: body.subcategory,
            name 			: body.name,
            key 			: body.key,
            smlDesc			: body.smlDesc,
            lngDesc			: body.lngDesc

        });

        trainingSetupDao.addSubject(subject_obj)
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
                        extras : JSON.parse(messages.SUBJECT_ADD_ERROR)
                    })
                )
            });

    })


}

/**
 * This is to Update training Sub Category
 *
 *
 * @param {} body
 */
module.exports.updateSubject = function(body) {

    return new Promise( function(resolve, reject) {

        trainingSetupDao.findSubjectById(body.subjectId)
            .then(function(subject){

                subject.name    =  body.name;
                subject.smlDesc =  body.smlDesc;
                subject.lngDesc =  body.lngDesc;
                subject.desc    =  body.desc;

                trainingSetupDao.updateSubject(subject)
                    .then(function(updatedSubject) {
                        resolve(
                            new ApiResponse({
                                success : true,
                                extras : updatedSubject
                            })
                        )
                    })
                    .catch(function(error){
                        reject(
                            new ApiResponse({
                                success : false,
                                extras : JSON.parse(messages.SUBJECT_UPDATE_ERROR)
                            })
                        )
                    });
            })
            .catch(function(error){
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUBJECT_NOT_FOUND)
                    })
                )
            });
    })
}


/**
 * This is to Update training category Status
 *
 *
 * @param {} body
 */
module.exports.updateSubjectStatus = function(body) {

    return new Promise( function(resolve, reject) {

        trainingSetupDao.findSubjectById(body.subjectId)
            .then(function(subject){

                if (body.status == "T") {
                    subject.status =  true;
                } else {
                    subject.status =  false;
                }

                trainingSetupDao.updateSubject(subject)
                    .then(function(updatedSubject) {
                        resolve(
                            new ApiResponse({
                                success : true,
                                extras : updatedSubject
                            })
                        )
                    })
                    .catch(function(error){
                        reject(
                            new ApiResponse({
                                success : false,
                                extras : JSON.parse(messages.SUBJECT_UPDATE_ERROR)
                            })
                        )
                    });
            })
            .catch(function(error){
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUBJECT_NOT_FOUND)
                    })
                )
            });
    })
}



/**
 * Delete Subject
 *
 *
 * @param {} body
 */
module.exports.deleteSubject = function(body) {

    return new Promise( function(resolve, reject) {

        trainingSetupDao.deleteSubject(body.subjectId)
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
                        extras : JSON.parse(messages.E_SYSTEM_ERROR)
                    })
                )
            });
    })
}



/**
 * This is to Get All Category
 *
 *
 * @param {} body
 */
module.exports.getAllSubjectForSubCategory = function(body) {

    var condition = {category : body.categoryId, subcategory : body.subCategoryId}

    return new Promise( function(resolve, reject) {

        trainingSetupDao.findSubjectByCategory(condition)
            .then(function(subjectList) {
                resolve(
                    new ApiResponse({
                        success : true,
                        extras : subjectList
                    })
                )
            })
            .catch(function(error){
                console.error(' ERROR :: ', error);
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUBJECT_FETCH_ERROR)
                    })
                )
            });
    })
}



/**
 * This is to Get All Category
 *
 *
 * @param {} body
 */
module.exports.getAllSubjectForCategory = function(body) {

    var condition = {category : body.categoryId}

    return new Promise( function(resolve, reject) {

        trainingSetupDao.findSubjectByCondition(condition)
            .then(function(subjectList) {
                resolve(
                    new ApiResponse({
                        success : true,
                        extras : subjectList
                    })
                )
            })
            .catch(function(error){
                console.error(' ERROR :: ', error);
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUBJECT_FETCH_ERROR)
                    })
                )
            });
    })
}


/**
 * This is to Get a Specific Subject using Subject ID
 *
 *
 * @param {} body
 */
module.exports.getSubjectDetails = function(body) {

    return new Promise( function(resolve, reject) {

        trainingSetupDao.findSubjectById(body.subjectId)
            .then(function(subject) {
                resolve(
                    new ApiResponse({
                        success : true,
                        extras  : subject
                    })
                )
            })
            .catch(function(error){
                reject(
                    new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.SUBJECT_FETCH_ERROR)
                    })
                )
            });
    })
}
