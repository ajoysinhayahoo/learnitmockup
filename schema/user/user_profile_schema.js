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

var studentProfile = new Schema({

	uid					: {type: Schema.Types.ObjectId, ref: 'User', index: true, default: null},
	
	instName			: { type: String, default: ''},
	totalExp			: { type: String, default: '0'},
	myWish				: { type: String, default: ''},
	myCategory			: { type: String, default: ''},
	working				: { type: Boolean, default: false },
	 
	
} , { collection: 'STUDENTPROFILE' });

studentProfile.plugin(autoIncrement.plugin, {
    model: 'StudentProfile',
    field: 'studentProfileId',
    startAt: 100,
    incrementBy: 1
});
 


var EPProfile = new Schema({

	uid					: {type: Schema.Types.ObjectId, ref: 'User', index: true, default: null},
	
	instName			: { type: String, default: ''},
	totalExp			: { type: String, default: '0'},
	myWish				: { type: String, default: ''},
	myCategory			: { type: String, default: ''},
	working				: { type: Boolean, default: false },
	 
	
} , { collection: 'EPPROFILE' });

 

EPProfile.plugin(autoIncrement.plugin, {
    model: 'EPProfile',
    field: 'epId',
    startAt: 100,
    incrementBy: 1
});
 

//expose the schema
module.exports = {
		
		StudentProfile		: mongoose.model('StudentProfile', studentProfile),
		EPProfile			: mongoose.model('EPProfile', EPProfile) 
};


