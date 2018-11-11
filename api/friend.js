const User = require('../model/users')
const express = require('express')
const router = express.Router();
const Notification = require('../model/notification')

router.get('/recommend',async (req, res) => {
	const email = req.query.email
	recommendedList=[]
	
	if(email){
		User.find(function(err,allUser){
			if(allUser){
				User.find({email:email},function(err,currUser){
					if(currUser){
						Notification.find({$or:[{"creater.email":email},{"receiver.email":email}]},function(err,noti){
							if(noti){
								for(usr of allUser){
									let flag=true
									for(usr2 of currUser[0].friends){
										if(usr.email===usr2.email) flag=false
									}
									for(usr3 of noti){
										if(usr.email===usr3.receiver.email || usr.email===usr3.creater.email) flag=false
									}
									if(flag && usr.email!==email) {
										recommendedList.push({name:usr.fname,email:usr.email})
									}
								}
								return res.json(recommendedList)
							}
							else return res.json({ success: false, message: 'recommended : notification list not found' })
						})
					}
					else return res.json({ success: false, message: 'recommended : current user not found' })
				})
			}
			else return res.json({ success: false, message: 'recommended : issue with geting all user' })
		}).select("fname email")
	}
	else return res.json({ success: false, message: 'recommended : invalid email' })	
});

router.post('/invite/send',async (req, res) => {
	const { myEmail, friendEmail } = req.body

	Notification.find({$and:[{ type: 'invite'},{ "creater.email": myEmail},{ "receiver.email": friendEmail }]},(err,re)=>{
		if(re.length!==0){
			console.log(re)
			return res.json({ success: false, message: 'invite send :  Request Already sent' })
		}	
		else{
			User.find({email:myEmail},(err,re)=>{
				if(re[0].fname){
					userName=re[0].fname;

					User.find({email:friendEmail},(err,re)=>{
						if(re[0].fname){
							friendName=re[0].fname;

							const entry = new Notification({ 
								type: 'invite',
								creater: { name:userName, email:myEmail},
								receiver:{ name:friendName , email:friendEmail}
							})

							entry.save(function (err,re) {
								if(re){
									//console.log(re)
									return res.json({ success: true, message: 'invitation sent' })
								}
								else return res.json({ success: false, message: 'invite send : invite notification failed' })
							})
						}
						else return res.json({ success: false, message: 'invite send : friend email not found' }) 
					}).select("fname")
				}
				else return res.json({ success: false, message: 'invite send : user email not found' })
			}).select("fname")
		}
	})
});

router.post('/invite/accept', async (req, res) => {
	const { myEmail, friendEmail } = req.body

	if(myEmail && friendEmail){
		Notification.find({$and:[{ type: 'invite'},{ "creater.email":friendEmail },{ "receiver.email":myEmail  }]},(err,re)=>{
			if(re.length!=0){
				notificationId=re[0]._id
				userName=re[0].receiver.name

				User.find({email:friendEmail},(err,re)=>{
					if(re[0].fname){
						friendName=re[0].fname

						Notification.findByIdAndDelete(notificationId,function(err,re){
							if(re){

								User.update({ email:myEmail }, { $push: { friends: {name:friendName,email:friendEmail} } },function(err,re){
									if(re){
										User.update({ email:friendEmail }, { $push: { friends: {name:userName,email:myEmail} } },function(err,re){
											if(re){
												return res.json({ success: true, message: "Friend request accepted" })
											}		
											else return res.json({ success: false, message: "Accept : user not pushed to other's friendlist" })
										})
									}		
									else return res.json({ success: false, message: "Accept : friend is not pushed to user friendlist" })
								})
							}
							else return res.json({ success: false, message: "Accept : Issue with deletion of notification" })
						})
					}
					else return res.json({ success: false, message: "Accept : no creater found of notification" })
				}).select("fname")
			}
			else return res.json({ success: false, message: "Accept : no notification found" })
		})
	}
	else return res.json({ success: false, message: "Accept : emails  not recieved" })
	
});

router.post('/invite/reject',async (req, res) => {
	const { myEmail, friendEmail } = req.body

	if(myEmail && friendEmail){
		Notification.find({$and:[{ type: 'invite'},{ "creater.email":friendEmail },{ "receiver.email":myEmail  }]},(err,re)=>{
			if(re.length!=0){
				notificationId=re[0]._id

				Notification.findByIdAndDelete(notificationId,function(err,re){
					if(re){
						return res.json({ success: true, message: "Request rejected" })
					}
					else return res.json({ success: false, message: "Reject : Issue with deletion of notification" })
				})


			}
			else return res.json({ success: false, message: 'Reject : no notification found' })
		})
	}
	else return res.json({ success: false, message: 'Reject : emails  not recieved' })	
});


router.get('/getAllFriends', async (req, res) => {
	const email = req.query.email
	if(email){
		User.find({email:email},function(err,re){
			if(re){
				return res.json(re[0].friends)
			}
			else return res.json({ success: false, message: 'get all friends:  email not found' })
		})
	}
	else return res.json({ success: false, message: 'get all friends: email did not recieved' })
});

router.delete('/unfriend',async (req, res) => {
	const myEmail = req.query.myEmail
	const friendEmail = req.query.friendEmail

	if(myEmail && friendEmail){
		User.find({ email:myEmail },(err,re)=>{
			if(re[0].friends.length!==0){

				userDetail={name:re[0].fname,email:re[0].email};
				let flag=false

				for(usr of re[0].friends){
					if(usr.email===friendEmail){
						friendDetails=usr
						flag=true
						break
					}
				}
				
				if(flag){					
					User.updateOne({ email:myEmail }, { $pull: { friends: friendDetails } },(err,re)=> {
						if (re) {
							User.updateOne({ email: friendEmail }, { $pull: { friends: userDetail } },(err,re)=> {
								if (re) {
									return res.json({ success: true, message: 'Unfriend successful' })
								}
								else return res.json({ success: false, message: 'user did not removed from friend friendlist' })

							})
						}
						else return res.json({ success: false, message: 'friend did not removed from friendlist' })
					})
				}
				else return res.json({ success: false, message: 'unfriend: friend is not in list' })
				
			}
			else return res.json({ success: false, message: 'unfriend: user has no friends' })
		})
	}
	else return res.json({ success: false, message: 'unfriend: emails did not recieved' })
});


module.exports = router;