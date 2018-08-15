/**
 * User Schema
 */

var mongoose 		= require('mongoose');

var autoIncrement 	= require('mongoose-auto-increment');

var Constants 		= require.main.require('./util/Constants');
var DBConnection 	= require.main.require('./util/DBConnection');


// get Connection
var connection 		= DBConnection.connection;

// Create Auto increment
autoIncrement.initialize(mongoose.connection);

// Schema Object
var Schema = mongoose.Schema;
 

// Create a schema for Address
var imageSchema = new Schema({

    application		: { type: String, default: ''}, // learning or training
	url				: { type: String, default: ''},
	type			: { type: String, default: ''}, // web or add for training

	ext	            : { type: String, default: ''},

	createBy		: { type: String, default: ''},
	createdAt		: { type: Date, default: Date.now },
	updateBy		: { type: String, default: ''},
	updateAt		: { type: Date }
	
	
} , { collection: 'IMAGES' });

 
//expose the schema
module.exports = {

        Image	: mongoose.model('Image', imageSchema)
};


