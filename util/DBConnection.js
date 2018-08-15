/**
 * Database url property
 */
var mongoose 		= require('mongoose');
var Constants 		= require.main.require('./util/Constants');

mongoose.Promise 	= global.Promise;

var dataBaseUrl = Constants.dataBaseUrl;

var options = {
	    server: {
	      auto_reconnect: true,
	      socketOptions : {
	        keepAlive: 1
	      }
	    }
	  };


mongoose.connect(dataBaseUrl, options);

db = mongoose.connection;

//CONNECTION EVENTS

//When successfully connected
db.on('open', function() {
	console.log('Mongoose default connection open to ' + dataBaseUrl);
});

//When successfully connected
db.on('connected', function() {
	console.log('Mongoose default connection open to ' + dataBaseUrl);
});

//If the connection throws an error
db.on('error', function(err) {
	console.log('Mongoose default connection error: ' + err);
});

//When the connection is disconnected
db.on('disconnected', function() {
	console.log('Mongoose default connection disconnected');
});

//If the Node process ends, close the Mongoose connection
process
		.on(
				'SIGINT',
				function() {
					db
							.close(function() {
								console
										.log('Mongoose default connection disconnected through app termination');
								process.exit(0);
							});
				});

 

