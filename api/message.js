const Message = require('../model/message')
const User = require('../model/users')
const express = require('express')
const router = express.Router();


router.post('/sendMessage', async (req, res) => {
	const { myEmail,friendEmail,messageContent } = req.body
	
	if ( myEmail && friendEmail && messageContent ) {

        User.find({ email: myEmail }, (err, re) => {
			if (re[0]) {
                userName = re[0].fname;

                User.find({ email: friendEmail }, (err, re) => {
                    if (re[0]) {
                        friendName = re[0].fname;

                        const message = new Message({
                            message:messageContent,
                            creater: { name: userName, email: myEmail },
                            receiver: { name: friendName, email: friendEmail }
                        })
                
                        message.save(function (err) {
                            if (err) {
                                return res.json({ success: false, message: err })
                            }
                            return res.json({ success: true, message: 'message send successful' })
                        })	
                    }
                    else return res.json({ success: false, message: 'friend email not found' })
                
                })
            }
            else return res.json({ success: false, message: 'your email not found' })
        })
    }
    else return res.json({ success: false, message: 'please provide inputs' }) 
});

router.get('/getAllMessage', async (req, res) => {
    const email = req.query.email
    if(email){
		Message.find({ "receiver.email": email},(err,re)=>{
            if(re.length!=0){
                return res.json({ success: true, result:re })
            }
            else return res.json({ success: false, message: 'no message found with email' })
        }).select("creater message").sort('-time')
    }
    else return res.json({ success: false, message: 'please provide valid input' })
});

router.get('/getChat', async (req, res) => {
    const myEmail = req.query.myEmail
    const friendEmail = req.query.friendEmail

    if(myEmail && friendEmail){
		Message.find({
                $or: [
                    {$and:[{ "receiver.email": myEmail },{ "creater.email": friendEmail }]},
                    {$and:[{ "creater.email": myEmail },{ "receiver.email": friendEmail }]}
                ]}
            ,(err,re)=>{
            if(re.length!=0){
                return res.json({ success: true, result:re })
            }
            else return res.json({ success: false, message: 'no message found for both' })
        }).select("creater message")
    }
    else return res.json({ success: false, message: 'please provide valid input' })

});

module.exports = router;