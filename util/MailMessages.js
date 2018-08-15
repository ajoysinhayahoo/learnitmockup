/**
 * 
 */

var nconf 					= require('nconf');

// Read file for env 
nconf.argv().env().file({ file:process.env.NODE_ENV + '.json'});

module.exports = {
		
		// Usre id message
		passwordmessage		: "Sir/ Madam, your [ email id {emailid} ] newly generated password to access societyaid.com is : {password}"
		 
		 
}