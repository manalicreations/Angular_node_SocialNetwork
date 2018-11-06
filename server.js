//Install express server
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser')
const session = require('express-session')
//const router = require('./api/apiRouter')

const app = express();
const morgan = require('morgan')
app.use(bodyparser.json())
app.use(morgan('dev'))
app.use(session({
    secret: 'ksjldklahshjsljksjkxshjchosjckspcgusjvghhdafhjsbjknsldjl',
    saveUninitialized:true,
    resave:false
}))

//app.use(router);

app.get('/test', async (req,res)=>{
	return res.json({status: "true" })
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/SocialNetwork'));

/* router.get('/test', async (req,res)=>{
	return res.json({status: "true" })
}); */
app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/SocialNetwork/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080,()=>{console.log('Node server started')});
