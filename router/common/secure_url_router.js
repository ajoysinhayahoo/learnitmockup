var express     = require('express')
var AWS         = require('aws-sdk');
var bodyParser  = require('body-parser');

var credentials         = new AWS.SharedIniFileCredentials({profile: 'ajoykumarsinha@gmail.com'});
AWS.config.credentials  = credentials;
AWS.config.region       = 'ap-south-1';

module.exports = function(app, zcache) {

    app.use(bodyParser.json({
        extended: false
    }));

    app.use(bodyParser.urlencoded({
        extended: false
    }))


    app.post('/s', function (req, res) {
        console.log(" This is here !!");
        console.log(" JSON.stringify(err) !!"+JSON.stringify(req.body));
        var s3 = new AWS.S3();
        var params = {Bucket: 'learning111', Key: req.body.name, ContentType: req.body.type};
        s3.getSignedUrl('putObject', params, function (err, url) {

            if (err) {
                console.log(err);
            } else {
                res.json({url: url});
                //s3Client.getResourceUrl("your-bucket", "some-path/some-key.jpg");
            }

        });

    })
}

