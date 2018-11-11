const Status = require('../model/status')
const User = require('../model/users')
const express = require('express')
const router = express.Router();

router.post('/setStatus', async (req, res) => {
	const { statusText, createrEmail } = req.body
	
	if (statusText && createrEmail) {
		User.find({ email: createrEmail }, (err, re) => {
			if (re[0]) {
				userName = re[0].fname;
				const status = new Status({
					status:statusText,
					creater: { name: userName, email: createrEmail }
				})

				status.save(function (err) {
					if (err) {
						return res.json({ success: false, message: err })
					}
					return res.json({ success: true, message: 'Status saved successful' })
				})
			}
			else return res.json({ success: false, message: 'user not found' })
		})
	}
});

router.get('/getAllStatus', async (req, res) => {
		Status.find(function (err, status) {
			if (status) {
				return res.json({ success: true, result: status })
			}
			else{
				return res.json({ success: false, message: 'status not found' })
			}
		}).select("creater status").sort('-time')
});

module.exports = router;