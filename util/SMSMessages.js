/**
 * 
 */

var nconf 					= require('nconf');


var smsconstants 	= require.main.require("./util/SMSConstants");

// Read file for env 
nconf.argv().env().file({ file:process.env.NODE_ENV + '.json'});

/**
 * var propertiesObject = {user:'zimasolconsulting@gmail.com', password:'1qazxsW2', msisdn:'919674493312', msg:'Dear User, your OTP for Society Planner Application is 12345.', sid:'SOCPLN', fl:'0', gwid:'2'}
 * 
 */

module.exports = {
		
		propertiesObject : {user:smsconstants.user,password:smsconstants.password,sid:smsconstants.sid,fl:smsconstants.fl,gwid:smsconstants.gwid},
		
		// password message
		passwordMessage		: "Dear User, your password for Society Planner Application is {password}.",
		otpMessage			: "Dear User, your OTP for Society aid Application (www.societyaid.com) is {otp}."
		 
		 
}