/**
 *
 */

var mongoose 		= require('mongoose');
var autoIncrement 	= require('mongoose-auto-increment');
var bcrypt   		= require('bcrypt-nodejs');

autoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

/**
 * LITE Types will be Training and Learning 
 */
var liteTypes = new Schema({

	name			: { type: String, default: '' },
	key				: { type: String, default: '' , index: { unique: true }},
	smlDesc			: { type: String, default: '' },
	lngDesc			: { type: String, default: '' },
	status			: { type: Boolean, default: true },
	defImg			: { type: String, default: '' },
 
	industryDemand	: { type: String, default: '' }, 	// Industry Demand
	futureProspect	: { type: String, default: '' },	// Future Prospect
	
	createBy		: { type: String, default: ''},
	createdAt		: { type: Date, default: Date.now },
	updateBy		: { type: String, default: ''},
	updateAt		: { type: Date },

} , { collection: 'LITE_TYPES' });

subject.plugin(autoIncrement.plugin, {
    model: 'LITETypes',
    field: 'liteTypesId',
    startAt: 100,
    incrementBy: 1
});


//expose the schema
module.exports = {
		LITETypes		:mongoose.model('LITETypes', liteTypes) 
};
