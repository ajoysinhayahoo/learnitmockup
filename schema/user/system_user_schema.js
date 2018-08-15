/**
 *
 */

var mongoose 		= require('mongoose');
var autoIncrement 	= require('mongoose-auto-increment');
var bcrypt   		= require('bcrypt-nodejs');

autoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;

var systemUser = new Schema({

	userId			: String,
    firstName		: String,
    lastName		: String,
	userEmail		: { type: String, default: '' },
	contactNumber	: { type: String, default: '' },
	userStatus 		: { type: String, default: 'ACTIVE' },
	firsttimeuser	: { type: String, default: 'NO' },
	createdOn		: { type: Date, default: Date.now }

} , { collection: 'SYSTEM_USERS' });


var suPwdScm = new Schema({

    userId				: {type: Schema.Types.ObjectId, ref: 'SystemUser', index: true, default: null},
    password			: { type: String, default: ''},

    lastPasswordChange	: { type: Date },
    lastFivePasswords	: { type: [String], default: ''},

    pwdPolicyActive		: { type: Boolean, "default": false },

    createBy			: { type: String, default: ''},
    createdAt			: { type: Date, default: Date.now },
    updateBy			: { type: String, default: ''},
    updateAt			: { type: Date }

} , { collection: 'SYSTEM_PWD' });


//expose the schema
module.exports = {
		SystemUser  :   mongoose.model('SystemUser', systemUser),
        SuPwdScm    :   mongoose.model('SuPwdScm', suPwdScm)
};
