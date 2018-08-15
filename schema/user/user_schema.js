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

var userSchema = new Schema({

	userId			: { type: String, default: '', index: true, unique : true},
	firstName		: { type: String, default: '', index: true},
	lastName		: { type: String, default: '', index: true},
	 
	userEmail		: { type: String, default: '', index: true, unique : true},
	contactNumber	: { type: String, default: '', index: true, unique : true},
	
	userStatus 		: { type: String, default: Constants.ACTIVE},

	firsttimeuser	: { type: String, default: Constants.YES_VALUE},
	 
	
	userType		: { type: String, default: ''}, // Student , Instructor , Institution
	userAddress		: {type: Schema.Types.ObjectId, ref: 'Address', index: true, default: null},
	
	emailVerified	: { type: Boolean, default: false },
	contactVerified	: { type: Boolean, default: false },
	
	emailVerifierKey: { type: String, default : "" },
	contactVerifierKey: { type: String, default : "" },
	
	failedLogin		: { type: Number, default : 0 },
	firstTimeLogin	: { type: Boolean, default: true },
	
	profileUpdate	: { type: Boolean, default: false },

    image			: {type: Schema.Types.ObjectId, ref: 'Image', default: null},
    imageUrl		: { type: String, default: ''},
		
	createBy		: { type: String, default: ''},
	createdAt		: { type: Date, default: Date.now },
	updateBy		: { type: String, default: ''},
	updateAt		: { type: Date },
	 
	
} , { collection: 'USERS' });


userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userKey',
    startAt: 1000,
    incrementBy: 2
}); 


//Create a schema for Address
var institutionSchema = new Schema({
	
	institutionname			: { type: String, default: ''},
	/*Institution Address*/
	institutionAddress		: {type: Schema.Types.ObjectId, ref: 'Address', index: true, default: null},
	 
	websiteAddress			: { type: String, default: ''},
	board					: { type: String, default: ''},
	type					: { type: String, default: ''},
	identifier				: { type: String, default: ''},
	courses					: { type: [String]},
	branches				: [{type: Schema.Types.ObjectId, ref: 'Institution', index: true, default: null}],
	franchaises				: [{type: Schema.Types.ObjectId, ref: 'Institution', index: true, default: null}],
	colleges				: [{type: Schema.Types.ObjectId, ref: 'Institution', index: true, default: null}],
	
	createBy				: { type: String, default: ''},
	createdAt				: { type: Date, default: Date.now },
	updateBy				: { type: String, default: ''},
	updateAt				: { type: Date }
	
	
} , { collection: 'ADDRESS' });

institutionSchema.plugin(autoIncrement.plugin, {
    model: 'Institution',
    field: 'institutionId',
    startAt: 100,
    incrementBy: 1
});


var passwordSchema = new Schema({

	userId				: {type: Schema.Types.ObjectId, ref: 'User', index: true, default: null},
	password			: { type: String, default: ''},
	
	lastPasswordChange	: { type: Date },
	lastFivePasswords	: { type: [String], default: ''},
	
	pwdPolicyActive		: { type: Boolean, "default": false },
	 
	createBy			: { type: String, default: ''},
	createdAt			: { type: Date, default: Date.now },
	updateBy			: { type: String, default: ''},
	updateAt			: { type: Date }
	
} , { collection: 'PASSWORD' });


//expose the schema
module.exports = {
		
		User		: mongoose.model('User', userSchema),
		Institution	: mongoose.model('Institution', institutionSchema),
		Password	: mongoose.model('Password', passwordSchema),
};


