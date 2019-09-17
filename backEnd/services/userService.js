/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon service.js
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

const model = require('../model/userModel.js');


class UserService {
    constructor() { }

    /**
     * @description- Request from controller is received and being sent to the model 
     * @param {*} registrationData 
     * @param {*} callback 
     */
    registerService(registrationData, callback) {

        try {
            console.log("\n\nIn registration services data ---->", registrationData);
            model.register(registrationData, (err, data) => {

                if (err) {
                    return callback(err);
                }
                else {
                    return callback(null, data)
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    loginService(loginData, callback) {
        try {
            console.log("\n\nIn login services data ---->", loginData);

            model.login(loginData, (err, data) => {

                if (err) {
                    return callback(err);
                }
                else {
                    return callback(null, data)
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    forgetPasswordService(forgetPasswordData, callback) {
        try {
            console.log("\n\nIn forget password services data ---->", forgetPasswordData);

            model.forgetPassword(forgetPasswordData, (err, data) => {

                if (err) {
                    return callback(err);
                }
                else {
                    return callback(null, data)
                }
            })
        } catch (error) {
            console.log(error);

        }
    }

    resetPasswordService(resetPasswordData, callback) {
        try {
            console.log("\n\nIn reset password services data ---->", resetPasswordData);

            model.resetPassword(resetPasswordData, (err, data) => {

                if (err) {
                    return callback(err);
                }
                else {
                    return callback(null, data)
                }
            })
        } catch (error) {
            console.log(error);

        }
    }


    allUsersService(callback) {

        try {
            console.log("\n\nIn all users  services data ---->");

            model.allUsers((err, data) => {

                if (err) {
                    return callback(err);
                }
                else {
                    return callback(null, data)
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

}

let exportedUserService=new UserService();
module.exports=exportedUserService;




