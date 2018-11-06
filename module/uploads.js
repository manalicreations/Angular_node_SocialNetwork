const multer = require('multer')

const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads');
	},
	filename: function(req, file, callback){
		callback(null, file.originalname)
	}
})

const filter = (req, file, callback) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		callback(null, true)
	}else{
		callback('File type not supported', false)
	}
}

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: filter
})

module.exports = upload