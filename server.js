//Install express server
const path = require('path');
const bodyparser = require('body-parser')
const session = require('express-session')
const express = require('express')
const router = require('./api/apiRouter')
const methodOverride = require('method-override');

const app = express()
const morgan = require('morgan')
app.use(bodyparser.json())
app.use(methodOverride('_method'));
app.use(bodyparser.json())

app.use(session({
    secret: 'ksjldklahshjsljksjkxshjchosjckspcgusjvghhdafhjsbjknsldjl',
    saveUninitialized:true,
    resave:false
}))

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/SocialNetwork'));

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/SocialNetwork/index.html'));
});

app.get('/login', async (req,res)=>{
	res.sendFile(path.join(__dirname+'/dist/SocialNetwork/index.html'));
});
// Start the app by listening on the default Heroku port
app.use(router);
app.listen(process.env.PORT || 8080,()=>console.log('Server started :)'));



