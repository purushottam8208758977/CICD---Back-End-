/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon chatService.js
 * 
 * Purpose          : Request's set data from the controller is being received in 
 *                    the service and then sent forward to the model  .
 * 
 * @file            : service.js
 * @author          : Purushottam
 * @version         : 1.0
 * @since           : 5-09-2019
 * 
 **************************************************************************/


let chattingModel = require('../model/chatModel')

module.exports = {

    /**
     * @description - Chatting service is used to receive the data from the controller and 
     *                send the data forward to the model .
     * @param {*} chattingData 
     * @param {*} callback 
     */
    sendMessageService(chattingData, callback) {
        try {

            console.log("\n\nIn chat service ... \n\n",chattingData);
            
            chattingModel.sendMessageChat(chattingData,(err,data)=>{

                if(err)
                {
                    return callback(err)
                }
                else{
                    return callback(null,data)
                }
            })

            
        } catch (error) {
            console.log(error)
        }
    },

    receiveMessageService( callback) {
        try {

            console.log("\n\nIn receive messages service ... \n\n");
            
            chattingModel.receiveMessageChat((err,data)=>{

                if(err)
                {
                    return callback(err)
                }
                else{
                    return callback(null,data)
                }
            })

            
        } catch (error) {
            console.log(error)
        }
    }
}