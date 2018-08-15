/**
 * http://usejsdoc.org/
 */
 
var bcrypt 		= require('bcrypt');

// Module Specific
var applicationSchema 		= require.main.require('./schema/application_schema');

const saltRounds = 10;
 
module.exports.isEmpty =  function (obj) {
    // null and undefined are "empty"
    if (obj == null) return true;
 
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;
 
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
 
    return true;
}
 

module.exports.formatPhoneNumber =  function (phonenumber, country) {
	
    // null and undefined are "empty"
	var formattedNumber = "";
	
	if (country === "IN") {
		if (phonenumber.length == 10) {
			formattedNumber = "91"+phonenumber;
	    } else if (phonenumber.length == 12) {
	    	formattedNumber = phonenumber;
	    }
	} else {
		if (phonenumber.length == 10) {
			formattedNumber = "91"+phonenumber;
	    } else if (phonenumber.length == 12) {
	    	formattedNumber = phonenumber;
	    }
	}    
 
    return formattedNumber;
}

//methods ======================
//generating a hash
module.exports.generateHash = function(password) {
	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(password, salt);
	return hash;
};

//checking if password is valid
module.exports.validateHash = function(userpassword,hash) {
	return bcrypt.compareSync(userpassword, hash);
};



module.exports.createCommentObject =  function (body, type) {

    // Create Comment Object
    var comment_obj = new applicationSchema.Comment({

        commentDate             : new Date(),
        commentBy               : body.userId,
        comment                 : body.comment,
        commentType             : type

    });

    return comment_obj;
}

module.exports.removeFileExtention =  function (fileName) {

	var formattedFileName = "";

    if (fileName != null && fileName != undefined) {
        formattedFileName = fileName.substring(0, fileName.lastIndexOf('.'));
	}
    return formattedFileName;
}

 