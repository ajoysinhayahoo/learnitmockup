/**
 * 
 */

var ApiResponse = function (cnf) {
	
    this.success 		= cnf.success;
    this.token 			= cnf.token;
    this.messagetype 	= cnf.messagetype;
    this.extras 		= cnf.extras;
    this.usertype 		= cnf.usertype;
    this.message 		= cnf.message;
    this.username 		= cnf.username;
    this.info 			= cnf.info;
    this.reference 		= cnf.reference;
    this.errorcode 		= cnf.info;
    
};

module.exports = ApiResponse;