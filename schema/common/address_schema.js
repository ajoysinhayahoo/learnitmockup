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
var addressSchema = new Schema({

    name			: { type: String, default: ''},
	addressline1	: { type: String, default: ''},
	addressline2	: { type: String, default: ''},
	addressline3	: { type: String, default: ''},
	pincode			: { type: Number, default: ''},
	city			: { type: String, default: ''},
	locality		: { type: String, default: ''},
	state			: { type: String, default: ''},
	district		: { type: String, default: ''},
	landmark		: { type: String, default: ''},
    otherFacility	: { type: String, default: ''},
	status			: { type: Boolean, default: true },

    capacity		: { type: Number, default: 10 },
	
	createBy		: { type: String, default: ''},
	createdAt		: { type: Date, default: Date.now },
	updateBy		: { type: String, default: ''},
	updateAt		: { type: Date }
	
	
} , { collection: 'ADDRESS' });

addressSchema.plugin(autoIncrement.plugin, {
    model: 'Address',
    field: 'addressId',
    startAt: 100,
    incrementBy: 1
});

 
//expose the schema
module.exports = {
		
		Address		: mongoose.model('Address', addressSchema)
};


