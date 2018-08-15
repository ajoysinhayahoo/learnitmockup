/**
 * User Operation on Database
 */

var fs 				= require('fs');
var http 			= require('http');
var mongoose 		= require('mongoose');
var express 		= require('express');
var Grid 			= require('gridfs-stream');
var bodyParser 		= require('body-parser');
 
var addressSchema 		= require.main.require('./schema/common/address_schema');
var DBConnection 		= require.main.require('./util/DBConnection');
var log          		= require.main.require('./util/log');


module.exports.addAddress = function(address_obj) {
	
	return new Promise( function(resolve, reject) {

        address_obj.save()
		.then(function(obj) {
		 		resolve(obj	)
		})
        .catch(function(error){
            	reject(error)
        });

	})
	 
}


module.exports.updateAddress = function(address_obj) {
	
	console.log(" Address Object >> "+JSON.stringify(address_obj));
	
	return new Promise( function(resolve, reject) {

        address_obj.save()
		.then(function(obj) {
			console.log(" User Object in updateUser"+JSON.stringify(obj));
		 	resolve(obj	)
		})
        .catch(function(error){
        		console.log(" updateMissedLogin "+error);
            	reject(error)
        });
		 		
	})
	 
}



module.exports.findAddress = function(searchCriteria) {

    console.log(" searchCriteria >> "+JSON.stringify(searchCriteria));

    return new Promise( function(resolve, reject) {

        addressSchema.Address.find(searchCriteria)
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

module.exports.getAddressById = function(addressId) {

    console.log(" searchCriteria >> "+JSON.stringify(searchCriteria));

    return new Promise( function(resolve, reject) {

        addressSchema.Address.findById(addressId)
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