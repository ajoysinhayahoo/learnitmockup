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
var commentSchema = new Schema({

    comment			: { type: String, default: ''},
	commentDate		: { type: Date, default: null},
    commentBy		: {type: Schema.Types.ObjectId, ref: 'User', index: true, default: null},
	
	createBy		: { type: String, default: ''},
	createdAt		: { type: Date, default: Date.now },
	updateBy		: { type: String, default: ''},
	updateAt		: { type: Date }
	
	
} , { collection: 'COMMENTS' });


 
//expose the schema
module.exports = {
		
		Comment		: mongoose.model('Comment', commentSchema)
};


