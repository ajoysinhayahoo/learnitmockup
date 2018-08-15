/**
 * http://usejsdoc.org/
 */
var request 		= require('request');
var format 			= require("string-template")
var querystring 	= require('querystring');

var appendQuery 	= require('append-query')

var Constants 		= require.main.require("./util/Constants");
var SMSMessages 	= require.main.require("./util/SMSMessages");
var SMSConstants 	= require.main.require("./util/SMSConstants");
var CommonFunctions = require.main.require("./util/CommonFunctions");
var format 			= require("string-template")


module.exports.sendPasswordonSMS = function(phonenumber, password) {
			
			var propertiesObject = SMSMessages.propertiesObject;
			propertiesObject.msisdn = CommonFunctions.formatPhoneNumber(phonenumber);
			propertiesObject.msg = format (SMSMessages.passwordMessage,{password : password});
			var myURL = appendQuery(SMSConstants.url,propertiesObject,{ encodeComponents: false });
			 
			request.get(myURL, function(err, response, body) {
				  if(err) { console.log(err); return; }
				  console.log("Get response: " + JSON.stringify(response));
			});

}


module.exports.sendOTPonSMS = function(phonenumber, otp) {
	
	var propertiesObject = SMSMessages.propertiesObject;
	propertiesObject.msisdn = CommonFunctions.formatPhoneNumber(phonenumber);
	propertiesObject.msg = format (SMSMessages.otpMessage,{otp : otp});
	var myURL = appendQuery(SMSConstants.url,propertiesObject,{ encodeComponents: false });
	 
	request.get(myURL, function(err, response, body) {
		  if(err) { console.log(err); return; }
		  console.log("Get response: " + JSON.stringify(response));
	});

}

 