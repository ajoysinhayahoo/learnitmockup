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
 

// Create a schema for Text
var textSchema = new Schema({

    text			: { type: String, default: '', index: true}, // Any Text

	book			: [{type: Schema.Types.ObjectId, ref: 'Book', index: true, default: null}],
    subject			: [{type: Schema.Types.ObjectId, ref: 'Subject', index: true, default: null}],
    chapter			: [{type: Schema.Types.ObjectId, ref: 'Chapter', index: true, default: null}],
    section			: [{type: Schema.Types.ObjectId, ref: 'Section', index: true, default: null}],

    timeaccessed	: { type: Number, default: 0},

    status          : { type: String, default: ''},

    creator			: {type: Schema.Types.ObjectId, ref: 'User', index: true, default: null},
    createdOn		: {type: Date , default: Date.now },
    reviewer		: {type: Schema.Types.ObjectId, ref: 'User', index: true, default: null},
    reviewedOn		: {type: Date , default: null },
    comment         : [{type: Schema.Types.ObjectId, ref: 'Comment', index: true, default: null}],
    finalizer		: {type: Schema.Types.ObjectId, ref: 'User', index: true, default: null},
    finalizedOn		: {type: Date , default: null },

	ext	            : { type: String, default: ''},

	createBy		: { type: String, default: ''},
	createdAt		: { type: Date, default: Date.now },
	updateBy		: { type: String, default: ''},
	updateAt		: { type: Date }
	
	
} , { collection: 'TEXTS' });


textSchema.plugin(autoIncrement.plugin, {
    model: 'Text',
    field: 'textId',
    startAt: 000001,
    incrementBy: 1
});

//expose the schema
module.exports = {
    Text	: mongoose.model('Text', textSchema)
};


