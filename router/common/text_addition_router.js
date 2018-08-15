
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

var textAdditionController 	= require.main.require("./controller/common/text_addition_controller");



module.exports = function (app, zcache) {

    app.use(bodyParser.json({limit:'50mb'}));
    app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));

    /**
     *
     */
    app.post('/api/createtextcontent', function (req, res) {

        var inputData = req.body;

        textAdditionController.addTextContent(inputData)
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
    app.post('/api/createmathcontent', function (req, res) {

        var inputData = req.body;

        textAdditionController.addTextContent(inputData)
            .then(function(result){

                console.log(result);
                res.send(result);

            }).catch(function(error){

                console.log(error);
                res.send(error);
            });
    })

    /**
     * Retrieve Content
     */
    app.post('/api/getcontent/:contentid', function (req, res) {

        textAdditionController.getTextContent(req.params.contentid)
            .then(function(result){

                console.log(" Here is the result >>"+JSON.stringify(result));
                res.send(result);

            }).catch(function(error){

                console.log(error);
                res.send(error);
            });
    })


}
