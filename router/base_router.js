/**
 * http://stackoverflow.com/questions/31461067/deleting-a-file-stored-in-a-folder-on-a-server-node-js-express
 * http://stackoverflow.com/questions/24379845/multer-stop-file-upload
 * https://github.com/nodemailer/nodemailer
 * http://howtonode.org/sending-e-mails-with-node-and-nodemailer
 * 
 * 
 * http://toon.io/understanding-passportjs-authentication-flow/
 * https://github.com/scotch-io/easy-node-authentication/tree/local
 * http://stackoverflow.com/questions/22186717/expressjs-passportjs-authentication-vs-sessions
 * https://scotch.io/tutorials/easy-node-authentication-setup-and-local
 * http://danialk.github.io/blog/2013/02/23/authentication-using-passportjs/
 * http://stackoverflow.com/questions/28691215/when-is-the-serialize-and-deserialize-passport-method-called-what-does-it-exact
 */

var http 			= require('http');
var fs 				= require('fs');
var bodyParser 		= require('body-parser');
var session 		= require('express-session');
var jwt 			= require('jwt-simple');

var SessionVariables = require.main.require("./util/SessionVariables");
var PageURL 		= require.main.require("./util/PageURL");

module.exports = function(app, zcache) {

	app.use(bodyParser.json({
		extended : true
	}));
	app.use(bodyParser.urlencoded({
		extended : true
	}))
 

	  
}
 
module.exports.displayStudentHomePage = function(res,zcache) {
	res.setHeader('Content-Type', 'text/html');
	res.send(zcache[PageURL.USER_HOME_PAGE]);
}

module.exports.displayTargetPage = function(res, page,zcache) {
	res.setHeader('Content-Type', 'text/html');
	res.send(fs.readFileSync(page));
}

module.exports.decodeToken = function(token) {
	var decodedToken = "";
	try {
		console.log("Token is "+token);
		decodedToken = JSON.parse(jwt.decode(token,SessionVariables.SESSION_VARIABLE.s));
		return decodedToken;
	} catch (err) {
		return new Error("Error Occured during decode");
	}
}

module.exports.getToken = function(headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		console.log("parted>> " + parted);
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};

module.exports.addNewAdminUser = function() {

	userController.addNewAdminUser(function(status, adminUserObject) {
		console.log(JSON.stringify(adminUserObject));
	});
}

 