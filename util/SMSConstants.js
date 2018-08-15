/**
 * 
 */

var nconf 					= require('nconf');

// Read file for env 
nconf.argv().env().file({ file:process.env.NODE_ENV + '.json'});

module.exports = {
		
		url					: "http://smslane.com/vendorsms/pushsms.aspx",
		user				: "zimasolconsulting@gmail.com",
		password			: "1qazxsW2",
		sid					: "SOCPLN",
		fl					: "0",
		gwid				: "2" 
		 
}