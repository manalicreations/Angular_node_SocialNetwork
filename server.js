//Install express server
const path = require('path');
const bodyparser = require('body-parser')
const session = require('express-session')
const express = require('express')
const router = require('./api/apiRouter')
const methodOverride = require('method-override');

const app = express()
app.use(bodyparser.json())
app.use(methodOverride('_method'));
app.use(bodyparser.json())

var server= require('http').createServer(app);
var io = require('socket.io').listen(server);

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

server.listen(process.env.PORT||8080);
console.log('server running...at 8080');

io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('socket connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('newMessage', (message) => {
        console.log("Order Received: " + message);
        io.emit('newMessage', {text: message});    
    });
})


