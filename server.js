//Install express server
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser')
const session = require('express-session')
const router = require('./api/apiRouter')
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/SocialNetwork'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/SocialNetwork/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080,()=>console.log('Angularstarted :)'));

const app2 = express()
const morgan = require('morgan')
app2.use(bodyparser.json())
app2.use(morgan('dev'))
app2.use(session({
    secret: 'ksjldklahshjsljksjkxshjchosjckspcgusjvghhdafhjsbjknsldjl',
    saveUninitialized:true,
    resave:false
}))
app2.use(router);

app2.listen(1234,()=>console.log('Server started :)'))