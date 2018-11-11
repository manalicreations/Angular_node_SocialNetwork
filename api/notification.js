const express = require('express')
const router = express.Router();

const Notification = require('../model/notification')

router.get('/getInvites',async (req,res)=>{
    const email = req.query.email

    if(!email){
        return res.json({success: false, message:'Got blank email for invites'})
    }
    else{
        Notification.find({$and:[{type:"invite"},{ "receiver.email": email}]},(err,re)=>{
            if(re.length!==0){
                
                let result=[]
                for(let a of re){
                    result.push(a.creater)
                };
                return res.json({success: false, result:result})
            }
            else return res.json({success: false, message:'notification : empty notification'})
        }).select("creater")
    }    
});

module.exports = router;