
var http 			= require('http');
var fs 				= require('fs');
var bodyParser 		= require('body-parser');
var session 		= require('express-session');
var jwt 			= require('jwt-simple');

var SessionVariables 	= require.main.require("./util/SessionVariables");
var PageURL 			= require.main.require("./util/PageURL");

module.exports = function(liteapp, zcache) {

	liteapp.use(bodyParser.json({
		extended : true
	}));
	liteapp.use(bodyParser.urlencoded({
		extended : true
	}))
	
	/**
	 * Generic Login
	 */
	
	liteapp.get('/login', function(req, res) {
		res.render('./learnitadmin/login_user.htm');
	});
	
	liteapp.get('/loginpass', function(req, res) {
		res.render('./learnitadmin/login_pass.htm');
	});
	
	liteapp.get('/loginotp', function(req, res) {
		res.render('./learnitadmin/login_otp.htm');
	});
	
	liteapp.get('/firsttimepwdchange', function(req, res) {
		res.render('./learnitadmin/firsttime_pwd_change.htm');
	});
	
	liteapp.get('/forgotpasswordadm', function(req, res) {
		res.render('./learnitadmin/forgotpassword_adm.htm');
	});
	
	liteapp.get('/newuserregisteradm', function(req, res) {
		res.render('./learnitadmin/registration_adm.htm');
	});
	
	
	/**
	 * Admin Pages ******************** Start
	 */
	
	liteapp.get('/admindashboard', function(req, res) {
		res.render('./learnitadmin/admin/admin_dashboard.htm');
	});
	
	liteapp.get('/admin/subjectlist', function(req, res) {
		res.render('./learnitadmin/admin/module/structure/subject/admin_subject_list.htm');
	});
	
	/**
	 * Admin Pages ******************** End
	 */
	
	
	/**
	 * Instructor Contribution ******************** Start
	 */
	
 
	liteapp.get('/imageuploadtest', function(req, res) {
		res.render('./contenttest/imageupload.htm');
	});

    liteapp.get('/videouploadtest', function(req, res) {
        res.render('./contenttest/videoupload.htm');
    });

    liteapp.get('/videocapture', function(req, res) {
        res.render('./contenttest/videocapture.htm');
    });

    liteapp.get('/audiocapture', function(req, res) {
        res.render('./contenttest/audiocapture.htm');
    });

    liteapp.get('/textcontent', function(req, res) {
        res.render('./contenttest/textcontent.htm');
    });

    liteapp.get('/mathcontent', function(req, res) {
        res.render('./contenttest/mathcontent.htm');
    });



	
	
	/*
	 * Instructor MCQ
	 */
	
	liteapp.get('/instructor/contribution/mcq', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/mcq/mcq.htm');
	});
	
	liteapp.get('/instructor/contribution/newmcq', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/mcq/newmcq.htm');
	});
	
	liteapp.get('/instructor/contribution/mymcqlist', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/mcq/mymcqlist.htm');
	});
	
	liteapp.get('/instructor/contribution/editmcq', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/mcq/editmcq.htm');
	});
	
	liteapp.get('/instructor/contribution/bulkmcq', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/mcq/bulkmcq.htm');
	});
	
	/*
	 * Instructor Book / Content
	 */
	
	liteapp.get('/instructor/contribution/newcontent', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/book/newcontent.htm');
	});
	
	liteapp.get('/instructor/contribution/editcontent', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/book/editcontent.htm');
	});
	
	liteapp.get('/instructor/contribution/mycontentlist', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/book/mycontentlist.htm');
	});
	
	liteapp.get('/instructor/contribution/bulkcontent', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/book/bulkcontent.htm');
	});
	
	/*
	 * Instructor Video
	 */
	
	liteapp.get('/instructor/contribution/newvideo', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/videos/newvideo.htm');
	});
	
	liteapp.get('/instructor/contribution/editvideo', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/videos/editvideo.htm');
	});
	
	liteapp.get('/instructor/contribution/myvideolist', function(req, res) {
		res.render('./learnitadmin/instructor/contribution/videos/myvideolist.htm');
	});
	

	/**
	 * Instructor Contribution ******************** End
	 */
	
	/**
	 * Instructor Review ******************** Start
	 */
	 
	liteapp.get('/instructor/review/mcqreviewdashboard', function(req, res) {
		res.render('./learnitadmin/instructor/review/mcq/mcqreviewdashboard.htm');
	});
	
	liteapp.get('/instructor/review/mymcqreviewlist', function(req, res) {
		res.render('./learnitadmin/instructor/review/mcq/mymcqreviewlist.htm');
	});
}
  

 