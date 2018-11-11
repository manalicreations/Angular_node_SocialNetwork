const mongoose = require('../module/connection')

const StatusSchema = new mongoose.Schema({

    status:{type: String, required: true },
    creater:{ email: { type: String, required: true } , name: { type: String, required: true}},
    time:{type : Date, default: Date.now}
     
}, function(err){
	if (err) { 
       console.log(err); 
     }
})

const Status = mongoose.model('Status', StatusSchema)
module.exports =  Status
