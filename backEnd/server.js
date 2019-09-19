/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * Purpose          : Serves acts as the entry point of the backend...
 * 
 * @file            : server.js
 * @author          : Purushottam
 * @version         : 1.0
 * @since           : 5-09-2019
 * 
 **************************************************************************/

const express = require('express');
const bodyParser = require('body-parser');
const app = express() //instance of express framework made
const mongoose = require('mongoose');

const route = require('./route/route');
const importedSocket = require('socket.io')

const controllerForChatting = require('../backEnd/controller/chatController.js')

const PORT =4000;


const dbConfig = require('./config/database')
const validator = require('express-validator')
//const cors=require('cors')                   cors is and alternative for static , used when login by facebook/twitter etc

require('dotenv').config()

app.use(express.static('../../CICD-FrontEnd/frontEnd'));
app.use(bodyParser.json());
app.use(validator());
app.use('/', route)




/**
 * @description - Connection with the database is set through mongoose framework
 */
mongoose.connect('mongodb://127.0.0.1:27017/AllChat', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log("connection failed", err)
    } else {
        console.log(`\n\n\tMongoDB database established succesfully !\n\n\n`);
    }
});


/**
 * @description - An event is emitted or listened when PORT is turned on
 */

const forSocket = app.listen(PORT, () => { //socket and server should be on the same port
    console.log(`\n\n\n\tServer is running on Port : ${PORT}`);

})

const io = importedSocket(forSocket) //now socket.io uses this 'forSocket' instance to listen the particular PORT

io.on('connection', (socket) => { //connection is the server side event occured and using the .on method connection is established
    console.log("\n\n\t\tSOCKET CONNECTED ! ")

    socket.on("sendingMessage", (message) => { // here sendingMessage is the custom event created

        controllerForChatting.sendMessageController(message, (err, messageData) => {//directly contacts the controller, no routing is needed

            if (err) {
                console.log("in server ----->socket failed ")
                return err;
            }
            else {
                io.emit(messageData.receiverId, messageData) // broadcast the event so that front end can receive it
            }

        })

    })
})

