/**
 *
 */

var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;


var autoIncrement 	= require('mongoose-auto-increment');
//Create Auto increment
autoIncrement.initialize(mongoose.connection);

var responseSchema = new Schema({
	data: Object,
	statusCode: String,
	statusMsg: String
});


var liveUsers = new Schema({

	userName		: String,
	userId			: String,
	numberOfDegit	: String,
	token			: String,
	ip				: String,
	lastAccesedAt	: { type: Date },
	createdOn		: { type: Date, default: Date.now }

} , { collection: 'LIVE_USERS' });

liveUsers.plugin(autoIncrement.plugin, {
    model: 'LiveUsers',
    field: 'loggedInUserNo',
    startAt: 100,
    incrementBy: 1
});


var LiveUsers 	= mongoose.model('LiveUsers', liveUsers);

//Create a model for Space
var ResponseSchema = mongoose.model('ResponseSchema', responseSchema);


//expose the schema
module.exports = {
		LiveUsers:LiveUsers,
		ResponseSchema:ResponseSchema
};
