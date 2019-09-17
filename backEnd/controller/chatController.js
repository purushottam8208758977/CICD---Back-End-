/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon chatController.js
 * 
 * Purpose          : Request from the route is received and sent forward to service .
 *                    Also separate fields are retrieved from the request body. 
 * @file            : controller.js
 * @author          : Purushottam
 * @version         : 1.0
 * @since           : 5-08-2019
 * 
 **************************************************************************/

const chattingService = require('../services/chatService.js')

exports.sendMessageController = (req) => {
    try {

        console.log("\n\nin send message controller ... ");
        
        //let response = {}

        /**
             * @description - From req data fields are made and a object
             *                is passed on to service below . 
             */
        let chattingData = {
            'senderId': req.senderId,
            'senderName': req.senderName,
            'receiverId': req.receiverId,
            receiverName: req.receiverName,
            'message': req.message
        }

        chattingService.sendMessageService(chattingData, (err, data) => {

            if (err) {
                return err
            }
            else {
                 return data;
              }

        })
    } catch (error) {
        console.log(error)
    }


}


exports.receiveMessageController = (req, res) => {
    try {

        console.log("\n\nin receive message controller ... ");
        
        let response = {}
        chattingService.receiveMessageService( (err, data) => {

            if (err) {
                response.success = false;
                response.error = err;

                return res.status(400).send(response); //400 is bad request error
                //also response will be printed on the postman pretty
            }
            else {
                response.success = true;
                response.result = data;

                console
                return res.status(200).send(response); //200 is ok status response code
                //also response will be printed on the postman pretty
            }

        })
    } catch (error) {
        console.log(error)
    }


}