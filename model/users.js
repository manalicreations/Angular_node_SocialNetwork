const mongoose = require('../module/Connection')
const userSeq = require('mongoose-sequence') (mongoose)
//const Notification = require('./Notification')

const UserSchema = new mongoose.Schema({
	_id: {type: Number},
    fname:{type: String, required: true},
	lname:{type: String, required: true},
	email:{type: String, required: true},
   	password:{type: String, required: true},
	phone:{type: String, required: true},
	gender:{type: String, required: true},
	dob:{type: String, required: true},
	friends:{type: Array, required: false}
	//notification:{type: [Notification], required: false}
}, function(err){
	if (err) { 
       console.log(err); 
     }
},{ _id: false })
UserSchema.plugin(userSeq);
const User = mongoose.model('User',UserSchema)
module.exports = User
