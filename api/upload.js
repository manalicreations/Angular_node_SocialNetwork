const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const express = require('express')
const router = express.Router();

const mongoose = require('mongoose');
const app = express()

//const conn = require('../module/connection')


// Mongo URI
//const mongoURI = 'mongodb://localhost:27017/Angular6';
const mongoURI='mongodb://saransh98:saransh989@ds247101.mlab.com:47101/angular6'
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  console.log('Mongodb started for upload:)')
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


// @route POST /upload
// @desc  Uploads file to DB
router.post('/uploadOneFile', upload.single('file'), (req, res) => {
  if(req.file){
    if(res){
      return res.json({ success:true,result: req.file.filename });
    }
    else return res.json({ success:false,message: "upload fail"});
  }
  else return res.json({ success:false,message: "filename not recieved"});

});


// @route GET /
// @desc Loads form
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});


// @route DELETE /files/:id
// @desc  Delete file
router.delete('/deleteFiles',(req, res) => {
  
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (!err) {
      return res.json({ success:true });
    }
    else{
      return res.json({ success:false,err:err });
    }

  });
});

/* 

// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image */


module.exports = router;
