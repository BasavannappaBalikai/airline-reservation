
/**
*	Provides driver independent way of accessing mongodb
*
*	@author Lakha Singh
*/

// Holds database connection info
var dbConfig = {
	hostname: "localhost",
	port: 27017,
	database: "aircanada"
};

// Client to connect to mongo-db
var mongodb;

var db;

try{
	mongodb = require( "mongodb" );
}catch( err ){
	console.log( err );
	throw( "mongodb node module not found. please use 'npm install -g mongodb'" );
}

//mongoClient = new mongodb.MongoClient( new mongodb.Server( dbConfig.hostname, dbConfig.port ), {native_parser: true});
db = new mongodb.Db( dbConfig.database, new mongodb.Server( dbConfig.hostname, dbConfig.port ));

// Private functions
var fn = {
	// Connects to collection asynchronously
	connect: function( collection, callback ){
		console.log( "mongodb.fn.connect" );

		db.open(function( err, database ){
			if ( err ){
				callback( err );
			} else{
				database.collection( collection, function( err, coll ){
					callback( err, coll, database );
				});		
			}	
		});
	}
};

var mongoDb = {
	find: function(){
		console.log( "mongodb.find" );

		var query, collection, callback;

		callback = Array.prototype.pop.call( arguments );
		collection = Array.prototype.pop.call( arguments );
		query = Array.prototype.pop.call( arguments );

		fn.connect( collection, function( err, lCollection, db ){
			if ( err ){
				callback( err );
			} else{
				lCollection.find( query ).toArray( function( err, items ){
					// Close connection
					db.close();

					// Return Data
					callback( err, items );
				});	
			}	
		});
	},

	save: function( collection, data ){
		console.log( "mongodb.insert" );
	},

	remove: function( collection, id ){
		console.log( "mongodb.delete" );
	}
};

module.exports = mongoDb;