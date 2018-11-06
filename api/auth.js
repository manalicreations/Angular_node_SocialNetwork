const User = require('../model/Users')
const express = require('express')
const router = express.Router();

router.post('/login', async (req,res)=>{		//login API
	const{email,password}=req.body
	
	if(!email||!password){
		res.json({success: false, message:'Email or password did not recieved'})
	}
	else{
		User.findOne({email},(function (err, result) {
			if (err) {
				return res.json({success: false, message: 'Something went wrong'})
			}
			else if(!result)
				return res.json({success:false,message: 'Email id doesn\'t exists'})
			else{
				User.findOne({email,password}, function(error, output){
					if (err) {
						return res.json({success: false, message: 'Something went wrong'})
					}
					else if(!output){
						return res.json({success: false, message:'Incorrect Password'})
					} 
					req.session[email] = output._id
					req.session.save()
					
					res.json({success: true, message:'Login Success'})
				})
			}
		}))  
	}
})

router.delete('/logout',async (req,res)=>{
	const email = req.query.email	
	if(email){
		if(req.session[email]!==undefined){
			delete req.session[req.query.email]
			return res.json({success:true,message:"user session deleted"})
		}
		else{
			return res.json({success:false,message:"user session not found"})
		}
	}
	else return res.json({success:false,message:"email send is not valid"})
});

router.get('/isUserLoggedIn', async (req,res)=>{
	if(req.query.email){
		return res.json({status: req.session[req.query.email]? true : false })
	}
	else return res.json({status:false })
});

module.exports = router;