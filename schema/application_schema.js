/**
 *
 */

var mongoose 		= require('mongoose');
var autoIncrement 	= require('mongoose-auto-increment');
var bcrypt   		= require('bcrypt-nodejs');

autoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;


var ImageMapping = new Schema({
	
	imagePath: String,
	imageId: String
	
}, { collection: 'IMAGE_MAPPING' });

var commentSchema = new Schema({

    commentDate	: { type: Date, default: Date.now },
    commentBy	: {	type: Schema.Types.ObjectId, ref: 'User', default: null},
    comment		: {	type: String, default: ""},
    commentType	: {	type: String, default: ""}

}, { collection: 'COMMENT' });


//expose the schema
module.exports = {

		ImageMapping    :   mongoose.model('ImageMapping', ImageMapping),
        Comment         :   mongoose.model('Comment', commentSchema)
};


