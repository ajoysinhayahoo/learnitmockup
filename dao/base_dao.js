/**
 * 
 */

var mongoose 	= require('mongoose');
var baseschema 	= require.main.require('./schema/base_schema');

// Default Objects
var responseObj = new baseschema.ResponseSchema({
	data : null,
	statusCode : "404",
	statusMsg : "DEFAULT ERROR"
});

module.exports = {
		responseObj : responseObj
}



module.exports.addLiveUser = function(liveUser_obj) {
   
	return new Promise( function(resolve, reject) {
		
		liveUser_obj.save()
		.then(function(obj) {
				console.log(" liveUser_obj obj "+obj);
		 		resolve(obj	)
		})
        .catch(function(error){
        		console.log(" 11 "+error);
            	reject(error)
        });
		 		
	})

}

module.exports.deleteLiveUser = function(condition) {
	
	return new Promise( function(resolve, reject) {
		
		baseschema.LiveUsers.find(condition).remove()
		.then(function(obj) {
				console.log(" liveUser_obj deleted "+obj);
		 		resolve(obj	)
		})
        .catch(function(error){
        		console.log(" 11 "+error);
            	reject(error)
        });
		 		
	})

}

module.exports.getLoggedInUserDetails = function(searchCriteria) {
	
	return new Promise( function(resolve, reject) {
		
		baseschema.LiveUsers.find(searchCriteria)
		.then(function(liveUserList) {
				console.log(" liveUserList >> "+liveUserList);
		 		resolve(obj	)
		})
        .catch(function(error){
        		console.log(" 11 "+error);
            	reject(error)
        });
		 		
	})

}

