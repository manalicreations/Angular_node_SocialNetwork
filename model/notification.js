const mongoose = require('../module/connection')

const NotificationSchema = new mongoose.Schema({
    type:{type: String, required: true},
	creater:{ email: { type: String, required: true } , name: { type: String, required: true}},
	receiver:{ email: { type: String, required: true } , name: { type: String, required: true}},
   	time:{type : Date, default: Date.now}
}, function(err){
	if (err) { 
       console.log(err); 
     }
})

const Notification = mongoose.model('Notification', NotificationSchema)
module.exports =  Notification
