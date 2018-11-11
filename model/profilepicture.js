const mongoose = require('../module/connection')

const ProfilePictureSchema = new mongoose.Schema({
	email:{type: String, required: true},
    path:{type: String, required: true}
}, function(err){
	if (err) { 
       console.log(err); 
     }
})

const ProfilePicture = mongoose.model('ProfilePicture', ProfilePictureSchema)
module.exports = ProfilePicture
