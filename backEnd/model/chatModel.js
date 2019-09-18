
const mongoose = require('mongoose');

//mongoose.chats.createIndex({"x":1},{unique:true})

/**
 * @description - You will need a new schema for chatting because,new
 *                now we need a new collection in our database for messages .
 * 
 *                schema ---> model ---> instance of model ---> document ---> many documents ---> one collection   

 */
const messageChatSchema = mongoose.Schema({//schema is a class in mongoose framework

    senderId: {
        type: String,
    },

    senderName: {
        type: String,
        require: [true, 'sender name should not be empty']
    },

    receiverId: {
        type: String,
    },

    receiverName: {
        type: String,
        require: [true, 'receiver name should not be empty']
    },

    message: {
        type: String,
        require: [true, ' Cant send empty message !']
    }
},
    {
        timestamps: true
    });


messageModel = mongoose.model('Chat', messageChatSchema)


module.exports = {

    sendMessageChat(chattingData, callback) {
        try {

            console.log("\n\n--->  In chat model .... ");

            let newMessageGenerated = new messageModel({

                "senderId": chattingData.senderId,
                "senderName": chattingData.senderName,
                "receiverId": chattingData.receiverId,
                "receiverName": chattingData.receiverName,
                "message": chattingData.message
            })

            console.log("\n\n\nNew Message is as follows : \n", newMessageGenerated)

            newMessageGenerated.save((err, data) => {

                if (err) {
                    console.log("\n\nMessage not saved !\n\n");
                    
                    return callback(err , "Message not saved")
                }
                else {
                    console.log("\n\nMessage sent succesfully !")
                    return callback(null, { message: " Message sent succesfully !", data })
                }
            })
        } catch (error) {
            console.log(error)
        }
    },

    receiveMessageChat(callback) {
        try {

            console.log("\n\n -----> In receive message chat  Model ...")
            
            messageModel.find({}, (err, data) => {

                if(err){

                    console.log("\n\nError generated while finding messages ... ")
                    return callback(err)
                }
                else{
                    if(data.length>0)
                    {
                        console.log("\n\n\nMESSAGES LOADED SUCCESFULLY !")
                        return callback(null,data)
                    }
                    else{
                        return callback(null,false)
                    }
                }
                
            })
        } catch (error) {
            console.log(error);

        }
    }
}