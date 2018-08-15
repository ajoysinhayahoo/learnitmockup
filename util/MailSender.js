/**
 * http://usejsdoc.org/
 */
var nodemailer 	= require('nodemailer');
var mg 			= require('nodemailer-mailgun-transport');
var format 		= require("string-template")

var Constants 		= require.main.require("./util/Constants");
var MailMessages 	= require.main.require("./util/MailMessages");




module.exports.sendSecurityToken = function(from, mailto, message) {
	
	 var auth = {
		      auth: {
		    	  api_key: Constants.api_key,
		          domain: Constants.domain
		      }
		    };

		    var transporter = nodemailer.createTransport(mg(auth));

		    var mailOptions = {
		        from: 'Tubular support <ajoykumarsinha@gmail.com>',
		        to: mailto,
		        subject: 'Your Security Token For Registration',
		        text: 'Your Security Toke For Registration', // plaintext body
		        html: 'Security Token is :: <b>'+message+'</b>' // html body
		    };

		    // send mail with defined transport object
		    transporter.sendMail(mailOptions, function(error, info){
		        if(error){
		            console.log(error);
		        }else{
		            console.log('Message sent: ' + info.response);
		        }
		    });
	
}


module.exports.sendPassword = function(from, mailto, password) {
	
	 var auth = {
			 auth: {
		    	  api_key: Constants.api_key,
		          domain: Constants.domain
		      }
		    };

		    var transporter = nodemailer.createTransport(mg(auth));

		    var mailOptions = {
		        from: 'Tubular support <ajoykumarsinha@gmail.com>',
		        to: mailto,
		        subject: 'Your Generated Password For Registration',
		        text: 'Your Generated Password For Registration', // plaintext body
		        html: format (MailMessages.passwordmessage, {emailid : mailto, password : password}) // html body
		    };

		    // send mail with defined transport object
		    transporter.sendMail(mailOptions, function(error, info){
		        if(error){
		            console.log(error);
		        }else{
		            console.log('Message sent: ' + info.response);
		        }
		    });
	
}

module.exports.sendUserid = function(from, mailto, userid) {
	
	 var auth = {
			  auth: {
		    	  api_key: Constants.api_key,
		          domain: Constants.domain
		      }
		    };

		    var transporter = nodemailer.createTransport(mg(auth));

		    var mailOptions = {
		        from: 'Tubular support <ajoykumarsinha@gmail.com>',
		        to: mailto,
		        subject: 'Your UserId For Registration',
		        text: 'Your UserId For Registration', // plaintext body
		        html: 'UserID is :: <b>'+userid+'</b>' // html body
		    };

		    // send mail with defined transport object
		    transporter.sendMail(mailOptions, function(error, info){
		        if(error){
		            console.log(error);
		        }else{
		            console.log('Message sent: ' + info.response);
		        }
		    });
	
}