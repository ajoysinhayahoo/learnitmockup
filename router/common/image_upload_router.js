
var http        = require('http');
var cors        = require('cors');
var fs          = require('fs');
var bodyParser  = require('body-parser');
var Grid        = require('gridfs-stream');
var mongoose    = require('mongoose');
var Excel       = require("exceljs");
var session     = require('express-session');
var AWS         = require('aws-sdk');

var multer      = require('multer');
var multerS3    = require('multer-s3');
var AWS         = require('aws-sdk');

var ApiResponse     = require.main.require("./util/ApiResponse.js");
var messages        = require.main.require('./util/Messages');
var Constants       = require.main.require("./util/Constants");

var imageUploadController 	= require.main.require("./controller/common/image_upload_controller");


var AWSParamCreator     = require.main.require("./util/AWSParamCreator");
var AWSconstants        = require.main.require("./util/AWSConstants");

var credentials         = new AWS.SharedIniFileCredentials({profile: 'ajoykumarsinha@gmail.com'});
AWS.config.credentials  = credentials;
AWS.config.region       = 'ap-south-1';

var s3                  = new AWS.S3();

//var gfs;

/*var s3 = new AWS.S3({
    region: AWSconstants.region
});

var done = false;
var resultObj = "";
var fileid = "";*/


module.exports = function (app, zcache) {

    app.use(bodyParser.json({limit:'50mb'}));
    app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));



    /**
     *
     */
    app.post('/api/createbucket', function (req, res) {

        var inputData = req.body;

        imageUploadController.createBucket(inputData)
            .then(function(result){

                console.log(result);
                res.send(result);

            }).catch(function(error){

                console.log(error);
                res.send(error);
            });
    })

    /**
     *
     */
    app.post('/api/uploadimage/:application/:type', function (req, res) {

        console.log(req.params);
        console.log(req.params.type);

        if (req.params.type != null && req.params.type != undefined && (req.params.type == "web" || req.params.type == "add" || req.params.type == "invoices")) {

            if (req.params.application != null && req.params.application != undefined
                    && (req.params.application == "learning" || req.params.application == "training" )) {

                imageUploadController.uploadImageFiles(req, res, req.params.type,req.params.application )
                    .then(function(result){

                        console.log(result);
                        res.send(result);

                    }).catch(function(error){

                        console.log(error);
                        res.send(error);
                    });
            } else {
                res.send("Application is not mentioned !!");
            }

        } else {
            res.send("Type is not mentioned !!");
        }

    })






    /**
     *
     */
    /*app.post('/api/uploadimage', function (req, res) {


        var storage = multer.diskStorage({

            destination: function (req, file, callback) {
                console.log(" file >>> " +
                    JSON.stringify(file));
                callback(null, './uploads');
            },

            filename: function (req, file, callback) {
                console.log(" file >>> " + JSON.stringify(file));
                //callback(null, file.originalname.substring(0, 20) + "-" + Date.now());
                callback(null, file.originalname.substring(0, 20));
            }
        });


        var file = req.file;

        var upload = multer({

            storage: storage,
            limits : {
                fileSize : Number(constants.UPLOADED_IMAGE_SIZE)
            },

        }).single('imagefile');

        upload(req, res, function(err) {

            var file = req.file;



           if (err) {

                console.log("  err >>> " + JSON.stringify(err));

                var response = new ApiResponse({
                    success : false,
                    extras : JSON.parse(messages.E_FILE_SIZE_EXIT)
                });

                if (file && file.path && file.originalname) {
                    fs.unlink(file.path);
                }

                res.end(JSON.stringify(response));

            } else {

                if (data instanceof Error) {

                    res.render('./admin/login.htm');

                } else {

                    console.log("  file 1>>> " + JSON.stringify(file.originalname));
                    console.log("  file 2>>> " + JSON.stringify(file.path));

                    var params = AWSParamCreator.createParam(module, "AJOY", "learning111", file.originalname, file.path);

                    s3.putObject(params, function(perr, pres) {
                        if (perr) {
                            console.log("Error uploading data: ", perr);
                            var response = new ApiResponse({
                                success : false,
                                extras : file,
                                username : data.loggedinIserId,
                                info : constants.IMAGE_STORAGE

                            });
                            fs.unlink(file.path);
                            res.end(JSON.stringify(response));
                        } else {

                              console.log("Successfully uploaded data to myBucket/myKey"+pres);
                              console.log("Successfully uploaded data to myBucket/myKey"+  JSON.stringify(pres));

                            var response = new ApiResponse({
                                success : true,
                                extras : file,
                                username : data.loggedinIserId,
                                info : constants.IMAGE_STORAGE
                            });
                            fs.unlink(file.path);
                            res.end(JSON.stringify(response));
                        }
                    });
                }

            }

        })

    });*/

   /* app.all('/api/test', function (req, res) {
        console.log(' within router ');
        console.log(' within router >>> ' + JSON.stringify(req.body));
        var token = req.body.token;
        console.log(" token is for upload image " + token);
    });

    app.get('/findimage/:id', cors(), function (req, res) {
        var fileid = req.params.id;
        appController.getImage(fileid, req, res, function (status, result) {

            if (status.success) {

            } else {
                res.send(result);
            }

        });

    });*/

    /**
     *
     * var deleteUploadedImage = function (imageid) {
	 * 
	 * var jsonadata = {imageidtodelete : imageid};
	 * 
	 * $.ajax({ contentType : "application/json", type : "POST", headers : {
	 * Accept : "application/json", "Access-Control-Allow-Origin" : "*" }, url:
	 * 'http://127.0.0.1:8181/deleteimage', data: JSON.stringify(jsonadata),
	 * dataType : "json", crossDomain : true, success: function(data) { var obj =
	 * JSON.parse(data); alert(obj); }, error: function(data) { alert("file not
	 * uploaded"); } }); }
     *
     *
     */
    /*app.post('/deleteaddimage', cors(), function (req, res) {

        var fileid = req.body.imageidtodelete;
        var inputData = req.body;

        appController.deleteImage(fileid, req, res, function (err) {

            console.log("err ", err) // form fields

            if (err) {

                return res.end("Error Deleting file.");

            } else {

                addManagercontroller.updateAdvertisement(inputData, function (status, result) {

                    addManagercontroller.getAdvertisements(inputData, function (status, advertisements) {

                        console.log(JSON.stringify(advertisements));
                        res.send(JSON.stringify(result));

                    });

                });

            }
        });

    });*/

}

var responsetoBrowser = function (req, res, url) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.write(fs.readFileSync(url));
    res.end();
}