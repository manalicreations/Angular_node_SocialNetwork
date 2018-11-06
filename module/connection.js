const conn = require('mongoose')
var mongoose = false;
conn.Promise = Promise

conn.connect('mongodb://localhost:27017/Angular6', { useNewUrlParser: true })
conn.set('useCreateIndexs', true);
// When successfully connected
conn.connection.on('connected', function () {  
  console.log('MongoDb started :)');
  mongoose = true;
});

// If the connection throws an error
conn.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err)
}); 

// When the connection is disconnected
conn.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  conn.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});
exports.mongoose = mongoose
module.exports = conn
