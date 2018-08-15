/**
 *  All error messages
 */

var sessionOptions = {
		cookieName		: "session",
		s				: "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM",
		secret			: "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM",
		duration 		: 30 * 60 * 1000,
		activeDuration	: 5 * 60 * 1000,
		httpOnly		: true,
		secure			: false,
		ephemeral		: true,
		saveUninitialized : false,
		ALGORITHM 		: "HS256",
		ISSUER 			: "127.0.0.1",
		AUDIENCE 		: "127.0.0.1"
};


module.exports = {

		SESSION_VARIABLE : sessionOptions
}

