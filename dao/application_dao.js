/**
 * 
 */

var http 			= require('http');
var mongoose 		= require('mongoose');
var express 		= require('express');
var bodyParser 		= require('body-parser');
var fs 				= require('fs');
var Grid 			= require('gridfs-stream');


var gfs;

var applicationSchema 	= require.main.require('./schema/application_schema');
var basedao 			= require.main.require('./dao/base_dao');

var responseObj = basedao.responseObj;

var app 			= express();

// create application/json parser
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({
	extended : true
}));



mongoose.connection.once('open',function() {
	
	console.log(" Mongoose DB connection >> "+mongoose.connection.db);
	
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
});

/*
 * 
 *  Upload Image Method 
 *
 */ 
module.exports.uploadImage = function(physicalfile, callback) {
	
	var writeStream = gfs.createWriteStream();
    fs.createReadStream(physicalfile.path).pipe(writeStream);

    writeStream.on('close', function(file) {
    	console.log(' File ID to  ' + file._id);
    	console.log(" File is within dao  "+file);
    	
    	// Save Image Mapping Object
    	var imageMapping_obj = new applicationSchema.ImageMapping({

    		imagePath : physicalfile.path,
    		imageId : file._id 
		});
		
    	imageMapping_obj.save(imageMapping_obj);
    	callback(null, file);
    	
    });
    writeStream.on('error', function(e) {
    	console.log("Could not upload file");
    	callback(e, null);
    });
}


/**
 * Get Image to Display on Screen
 * 
 */
module.exports.getImage = function(fileid,req,res,callback) {
	
	 gfs = Grid(mongoose.connection.db, mongoose.mongo);

	 
	 gfs.findOne({ _id: fileid}, function(err, file) {
	      if(err) {
	    	  console.log("Error Occured !!!");	
	    	  callback(err, null);
	      } else if(!file){
	    	  console.log("Error File not found !!!");	
	    	  callback("Error File not found !!!", null);
	      } else {
	          var readstream = gfs.createReadStream({
	            _id: file._id
	          });

	          console.log("readstream is "+readstream);	
	          console.log("readstream is "+file.contentType);	
	          
	          res.set('Content-Type', file.contentType);

	          readstream.on('error', function (err) {
	        	  console.log("Error on file read");	
	          });
	          readstream.on('open', function () {
	              readstream.pipe(res);
	          });
	      }
	  });
}

/**
 * 
 * Method to Delete Image 
 *
 */
module.exports.deleteImage = function(fileid, imagepath, req,res) {
 	
	 gfs = Grid(mongoose.connection.db, mongoose.mongo);
	 
	 gfs.remove({ _id: fileid}, function(err, photo) {

		    if(err) { 
		        //return res.send({status: "200", response: "fail"});
		     }
		    if (imagepath != null) {
		    	
		    	 fs.unlink(imagepath, function() {
		    		    
				       /*res.send ({
				         status: "200",
				         responseType: "string",
				         response: "success"
				       });  */   
				 });
		    }
		    
	  });
	
}



 
/**
 * 
 * 
 * Method to Get mapping Object 
 *
 */

module.exports.getMappingObject = function(condition, callback) {
	applicationSchema.ImageMapping.find(condition,callback);
}


/**
 * 
 * 
 * Method to Remove mapping Object 
 *
 */
module.exports.removeImageMappingObject = function(condition) {
	
	applicationSchema.ImageMapping.findOne(condition, function (err, model) {
	    if (err) {
	        return;
	    }
	    model.remove(function (err) {
	        console.log("model removed without error !!");
	    });
	});
	 
}

module.exports.addComment = function(comment_obj) {

    return new Promise( function(resolve, reject) {

        comment_obj.save()
            .then(function (obj) {
                resolve(obj)
            })
            .catch(function (error) {
                reject(error)
            })
    })
};







