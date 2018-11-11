const mongoose = require('../module/connection')

const MessageSchema = new mongoose.Schema({
    message:{type: String, required: true },
    creater:{ email: { type: String, required: true } , name: { type: String, required: true}},
	receiver:{ email: { type: String, required: true } , name: { type: String, required: true}},
   	time:{type : Date, default: Date.now}
}, function(err){
	if (err) { 
       console.log(err); 
     }
})

const Message = mongoose.model('Message', MessageSchema)
module.exports =  Message