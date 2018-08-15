/**
 * 
 */

var nconf 					= require('nconf');

// Read file for env 
nconf.argv().env().file({ file:process.env.NODE_ENV + '.json'});

module.exports = {

		dataBaseUrl 		: "mongodb://"+nconf.get('dbip')+":"+nconf.get('dbport')+"/LEARNITEASY",
		adminUserName		: "root",
		adminUserFName		: "Super",
		adminUserLName		: "User",
		adminUserPassword	: "admin",
		adminContactNumber	: "9874748802",
		adminEmail			: "zimasolconsulting@gmail.com",
		
		api_key				: 'key-3ebb6cdf851dfb7bfa9c8d9243a4c9fb',
        domain				: 'learniteasy.com',
		
		YES_VALUE 			: "YES",
		NO_VALUE 			: "NO",

		ACTIVE	 			: "ACTIVE",
		INACTIVE 			: "INACTIVE",
		SUSPENDED 			: "SUSPENDED",
		MAX_LOGIN_FAIL 		: "MAXLOGINFAIL",
		
		USER_ADMIN	 		: "SUADMIN",
		USER_STUDENT 		: "STUDENT",
		
		COURSE_SEMINAR	 	: "SEMINAR",
		COURSE_WEB	 		: "WEB",
		COURSE_CLASSROOM	: "CLASSROOM",
		
		USER_CACHE_ALIVE 	: "10000",
		
		NO_MAX_LOGIN_FAILURE: "2",
		
		// CORN JOB TIMING
		SESSION_CLEAN_SCHEDULE 	: "1 1 0 * * *", // Run every mid night at 12:01:01

		BOOKING_AWATINGCONFIRMATION     : "AWATING CONFIRMATION",
        BOOKING_PAYMENT_DUE             : "PAYMENT_DUE",
        BOOKING_CONFIRMED               : "CONFIRMED",

    	VIDEOS               			: "VIDEOS",
    	AUDIOS               			: "AUDIOS",
    	IMAGES               			: "IMAGES",

    	TEXT_NEW               			: "NEW",
    	TEXT_REVIEW                     : "REVIEW",
    	TEXT_ERROR                      : "ERROR",
        TEXT_RE_REVIEW                  : "RE-REVIEW",
        TEXT_OK                         : "OK",
        TEXT_FINAL                      : "FINAL",
		 
}