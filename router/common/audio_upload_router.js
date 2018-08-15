
var http        = require('http');
var cors        = require('cors');
var fs          = require('fs');
var bodyParser  = require('body-parser');
var Grid        = require('gridfs-stream');
var mongoose    = require('mongoose');
var Excel       = require("exceljs");
var session     = require('express-session');
var AWS         = require('aws-sdk');

var multiparty  = require('multiparty');

var AWS         = require('aws-sdk');

var ApiResponse     = require.main.require("./util/ApiResponse.js");
var messages        = require.main.require('./util/Messages');
var Constants       = require.main.require("./util/Constants");

var audioUploadController 	= require.main.require("./controller/common/audio_upload_controller");


var AWSParamCreator     = require.main.require("./util/AWSParamCreator");
var AWSconstants        = require.main.require("./util/AWSConstants");

var credentials         = new AWS.SharedIniFileCredentials({profile: 'ajoykumarsinha@gmail.com'});
AWS.config.credentials  = credentials;
AWS.config.region       = 'ap-south-1';
var s3                  = new AWS.S3();


module.exports = function (app, zcache) {

    app.use(bodyParser.json({limit:'50mb'}));
    app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));


    /**
     *
     */
    app.post('/api/uploadpvtaudio/:application/:itisfor/:type', function (req, res) {

        var application     = "";
        var itisfor         = "";
        var type            = "";
        var security        = "pvt";
        var securityFlag    = true;


        if (req.params.application != null && req.params.application != undefined
            && (req.params.application == "training" )) {

            application = req.params.application;

            if (req.params.itisfor != null && req.params.itisfor != undefined
                && (req.params.itisfor == "courses" )) {

                itisfor = req.params.itisfor;

                if (req.params.type != null && req.params.type != undefined &&
                    (req.params.type == "classroom" || req.params.type == "seminar" || req.params.type == "web")) {

                    var form            = new multiparty.Form();

                    form.on('part', function(part) {

                        type = req.params.type;

                        var orgFilename     = part.filename;
                        var fileName        = orgFilename.split(' ').join('');
                        var bucket          = AWSconstants.bucket;
                        var destinationPath = Constants.AUDIOS + "/" + application + "/" + itisfor+ "/" +type+ "/" +  security +"/"+fileName;


                        if (part.filename) { //a file upload
                            s3.putObject({
                                Bucket: bucket,
                                Key: destinationPath,
                                ACL: 'private',
                                Body: part,
                                ContentLength: part.byteCount,
                            }, function(err, data) {

                                if (err) {
                                    console.log("error on file upload" + err);
                                    throw err;
                                } else {
                                    var fileExt = fileName.split('.').pop();

                                    audioUploadController.uploadAudioFileDetails(application, destinationPath, type, fileName, fileExt, securityFlag)
                                        .then(function(result){

                                            console.log(result);
                                            res.send(result);

                                        }).catch(function(error){

                                            console.log(error);
                                            res.send(error);
                                        });
                                }

                            });
                        }

                    });
                    form.parse(req);

                } else {

                    var error = new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.AUDIO_UPLOAD_ERROR_TYPE)
                    })

                    res.send(error);
                }

            } else {

                var error = new ApiResponse({
                    success : false,
                    extras : JSON.parse(messages.AUDIO_UPLOAD_ERROR_ITISFOR)
                })

                res.send(error);
            }

        } else {

            var error = new ApiResponse({
                success : false,
                extras : JSON.parse(messages.AUDIO_UPLOAD_ERROR_APPLICATION)
            })

            res.send(error);
        }

    })




    /**
     * Upload Public Videos
     */
    app.post('/api/uploadpubaudio/:application/:itisfor/:type', function (req, res) {

        var application     = "";
        var itisfor         = "";
        var type            = "";
        var security        = "pub";
        var securityFlag    = false;


        if (req.params.application != null && req.params.application != undefined
            && (req.params.application == "training" )) {

            application = req.params.application;

            if (req.params.itisfor != null && req.params.itisfor != undefined
                && (req.params.itisfor == "courses" )) {

                itisfor = req.params.itisfor;

                if (req.params.type != null && req.params.type != undefined &&
                    (req.params.type == "classroom" || req.params.type == "seminar" || req.params.type == "web")) {

                    var form            = new multiparty.Form();

                    form.on('part', function(part) {

                        type = req.params.type;

                        var orgFilename     = part.filename;
                        var fileName        = orgFilename.split(' ').join('');
                        var bucket          = AWSconstants.bucket;
                        var destinationPath = Constants.AUDIOS + "/" + application + "/" + itisfor+ "/" +type+ "/" +  security +"/"+fileName;


                        if (part.filename) { //a file upload
                            s3.putObject({
                                Bucket: bucket,
                                Key: destinationPath,
                                ACL: 'public-read',
                                Body: part,
                                ContentLength: part.byteCount,
                            }, function(err, data) {

                                if (err) {
                                    console.log("error on file upload" + err);
                                    throw err;
                                } else {
                                    var fileExt = fileName.split('.').pop();

                                    audioUploadController.uploadAudioFileDetails(application, destinationPath, type, fileName, fileExt, securityFlag)
                                        .then(function(result){

                                            console.log(result);
                                            res.send(result);

                                        }).catch(function(error){

                                        console.log(error);
                                        res.send(error);
                                    });
                                }

                            });
                        }

                    });
                    form.parse(req);

                } else {

                    var error = new ApiResponse({
                        success : false,
                        extras : JSON.parse(messages.AUDIO_UPLOAD_ERROR_TYPE)
                    })

                    res.send(error);
                }

            } else {

                var error = new ApiResponse({
                    success : false,
                    extras : JSON.parse(messages.AUDIO_UPLOAD_ERROR_ITISFOR)
                })

                res.send(error);
            }

        } else {

            var error = new ApiResponse({
                success : false,
                extras : JSON.parse(messages.AUDIO_UPLOAD_ERROR_APPLICATION)
            })

            res.send(error);
        }

    })
}

