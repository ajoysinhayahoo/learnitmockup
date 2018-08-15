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

module.exports = function(liteapp, zcache) {

	liteapp.use(bodyParser.json({
		extended : true
	}));
	liteapp.use(bodyParser.urlencoded({
		extended : true
	}))
 

	liteapp.get('/', function(req, res) {
		res.render('./learniteasy/studenthome.htm');
	});
	
	liteapp.get('/searchresult', function(req, res) {
		res.render('./learniteasy/student/searchresult.htm');
	});
	
	liteapp.get('/courses', function(req, res) {
		res.render('./learniteasy/student/courses.htm');
	});
	
	liteapp.get('/coursedetails', function(req, res) {
		res.render('./learniteasy/student/coursedetails.htm');
	});
	
	liteapp.get('/register', function(req, res) {
		res.render('./learniteasy/registration.htm');
	});
	
	liteapp.get('/registrationsuccess', function(req, res) {
		res.render('./learniteasy/registrationsuccess.htm');
	});
	
	liteapp.get('/mycourses', function(req, res) {
		res.render('./learniteasy/student/mycourses.htm');
	});
	
	liteapp.get('/allevents', function(req, res) {
		res.render('./learniteasy/student/events.htm');
	});
	
	liteapp.get('/nextweekendevents', function(req, res) {
		res.render('./learniteasy/student/events.htm');
	});
	
	liteapp.get('/nextmonthevents', function(req, res) {
		res.render('./learniteasy/student/events.htm');
	});
	
	liteapp.get('/nextthreemonthevents', function(req, res) {
		res.render('./learniteasy/student/events.htm');
	});
	
	liteapp.get('/eventsishudattend', function(req, res) {
		res.render('./learniteasy/student/events.htm');
	});
	
	liteapp.get('/eventdetails', function(req, res) {
		res.render('./learniteasy/student/eventdetails.htm');
	});
	
	liteapp.get('/aboutus', function(req, res) {
		res.render('./learniteasy/aboutus.htm');
	}); 
	
	liteapp.get('/contactus', function(req, res) {
		res.render('./learniteasy/contactus.htm');
	});  
	 
	liteapp.get('/findyourpath', function(req, res) {
		res.render('./learniteasy/student/findyourpath.htm');
	});
	
	liteapp.get('/roadforfreshers', function(req, res) {
		res.render('./learniteasy/student/roadforfreshers.htm');
	});
	
	liteapp.get('/roadforexperienced', function(req, res) {
		res.render('./learniteasy/student/roadforexperienced.htm');
	});
	
	liteapp.get('/techtrends', function(req, res) {
		res.render('./learniteasy/student/techtrends.htm');
	});
	
	liteapp.get('/jobtrends', function(req, res) {
		res.render('./learniteasy/student/jobtrends.htm');
	});
	
	liteapp.get('/mcqhomestudent', function(req, res) {
		res.render('./learniteasy/student/mcqhomestudent.htm');
	});
	
	liteapp.get('/mcqhomegeneral', function(req, res) {
		res.render('./learniteasy/student/mcqhomegeneral.htm');
	});
	
	
	liteapp.get('/sendyourquery', function(req, res) {
		res.render('./learniteasy/student/mcqhome.htm');
	});
	
	liteapp.get('/mcqstartconfirmation', function(req, res) {
		res.render('./learniteasy/student/mcqstartconfirmation.htm');
	});
	
	liteapp.get('/mcq', function(req, res) {
		res.render('./learniteasy/student/mcq.htm');
	});
	
	liteapp.get('/mcqcomplete', function(req, res) {
		res.render('./learniteasy/student/mcqcomplete.htm');
	});
	
	liteapp.get('/mcqresult', function(req, res) {
		res.render('./learniteasy/student/mcqresult.htm');
	});
	
	liteapp.get('/myresult', function(req, res) {
		res.render('./learniteasy/student/mcqresult.htm');
	});
	
	liteapp.get('/myprofile', function(req, res) {
		res.render('./learniteasy/student/myprofile.htm');
	});
	
	liteapp.get('/forgotpassword', function(req, res) {
		res.render('./learniteasy/forgotpassword.htm');
	});
	
	liteapp.get('/firsttimepassword', function(req, res) {
		res.render('./learniteasy/firsttimepassword.htm');
	});
	
	liteapp.get('/faq', function(req, res) {
		res.render('./learniteasy/faq.htm');
	});
	
	
}
  

 