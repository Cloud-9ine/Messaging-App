const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const userModel = require('./models/user');
const userRoute = require('./routes/user');
const dbURI = 'mongodb+srv://admin:MAKEITHAPPEN123@cluster0.rm4fp3i.mongodb.net/';
const PORT = 3001;
const socketIO = require('socket.io');
const server = http.createServer(app)
const io = socketIO(server);

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use('/user', userRoute);



//Database connection
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    server.listen(PORT, ()=>{
        console.log(`Listening to server at localhost:${PORT}`);
    })
    console.log('Connected to database')
})
.catch(err => {
    if(err.message == "querySrv ECONNREFUSED _mongodb._tcp.cluster0.rm4fp3i.mongodb.net"){
        console.log("Slow network, Server needs to restart...");
    }else{
        console.log({
            errorMessage: err.message,
        })
    }
})

io.on('connection', socket => {
    console.log('User Connected')

    socket.on('message', msg => {
        io.emit('message', msg)
    })

    socket.on('disconnected', msg => {
        console.log('User disconnected')
    })
})

app.get('/', (req, res)=>{
    res.render('home')
})

