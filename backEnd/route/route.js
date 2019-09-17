/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon route.js
 * 
 * Purpose          : Route collects the data from server.js and sends forward to
 *                    controller for further processing  . 
 * @file            : route.js
 * @author          : Purushottam
 * @version         : 1.0
 * @since           : 11-08-2019
 * 
 **************************************************************************/

const express = require('express');

const route = express.Router();

const controllerUsed = require('../controller/userController.js');

const controllerForChatting = require('../controller/chatController.js')


const tokenFile = require('../middleware/token')
    /**
     * @description - Request will be routed to registration api
     */
route.post('/registration', controllerUsed.register);

route.post('/login', controllerUsed.login)

route.post('/forgetPassword', controllerUsed.forgetPassword)

route.post('/resetPassword/:token', tokenFile.verifyToken, controllerUsed.resetPassword)

route.get('/allUsers/', controllerUsed.allUsersController)

route.get('/receiveMessage', controllerForChatting.receiveMessageController)

// route.post('/sendMessage', controllerForChatting.sendMessageController)



module.exports = route;