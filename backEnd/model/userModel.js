/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon model.js
 * 
 * Purpose          : Model contains the schema for database as mongodb is without
 *                    schema and the data received from the service is put in the 
 *                    schema and that schema variable's model is saved in the 
 *                    MONGO DATABASE . for jenkins ...
 * 
 * @file            : model.js
 * @author          : Purushottam
 * @version         : 1.0
 * @since           : 5-09-2019
 * 
 **************************************************************************/
const mongoose = require('mongoose');
const bycrypt = require('bcrypt')
const generateMail = require('../middleware/nodeMailer.js')
const generateToken = require('../middleware/token.js')




    let user = mongoose.Schema({ //schema is a class in mongoose framework


        firstName: {
            type: String,
            require: [true, 'first name should not be empty']
        },
    
        lastName: {
            type: String,
            require: [true, 'last name should not be empty']
        },
    
        email: {
            type: String,
            require: [true, 'email should not be empty'],
            unique: true
        },
    
        password: {
            type: String,
            require: [true, 'password should not be empty']
        },
    }, {
        timestamps: true
    });
    
    /**
     * @description - Using a schema named 'user' and collection named 'modelSchema' a new model is made .
     */
    let userModel = mongoose.model('modelSchema', user) //creating a new model
        //modelSchema is the collection's name 
    
    
    /**
     * @description - It hashes(encrypts) the password entered by the user .
     * @param {@} password 
     * @param {*} callback 
     */
     hash=(password, callback)=> {
    
        bycrypt.hash(password, 10, function(err, hashedPassword) {
    
            if (err) {
                return callback(err)
            } else {
                return callback(null, hashedPassword);
            }
    
        })
    }
    
    class UserModel{
        constructor(){
           
        }
    
    
    
        /**
         * @description - Finally the request sent from service is received and data 
         *                is set in the schema made.
         *  
         * @param {*} registrationData 
         * @param {*} callback 
         */
        register(registrationData, callback) {
    
            try {
              //  console.log(`\n\n\tIn model---> registered data --- ${registrationData.email}`);
    
                userModel.find({ 'email': registrationData.email }, 'email', (err, data) => { //ALWAYS RETURNS A ARRAY
    
                    if (err) {
                        return callback(err);
                    } else {
    
                        if (data.length > 0) {
    
                            console.log(`\n\n\tEmail already registered, try a different email !`);
    
                            return callback(null, false);
    
                        } else { //email not found , requested email id unique
    
                           // console.log("\n\n\tbefore encrypting password - ", registrationData.password)
    
                            hash(registrationData.password, (err, data) => {
    
                                if (err) {
                                    console.log("\n\n\tEncrytion failed !")
                                    return callback(err + "Encryption Failed !!! ")
                                } else {
                                    console.log(`\n\n\tEncrypted password ${data}\n\n`);
    
    
                                    console.log("data :", registrationData);
    
                                    let newUser = new userModel({
                                        "firstName": registrationData.firstName,
                                        "lastName": registrationData.lastName,
                                        "email": registrationData.email,
                                        "password": data //hashed password inserted
                                    })
                                    console.log(newUser);
    
                                    /**
                                     * @description - The schema is kept in a variable registrationData
                                     *                and that variable is stored in the database.
                                     */
                                    newUser.save((err, data) => {
    
                                        if (err) {
                                            return callback(err);
                                        } else {
    
                                            return callback(null, { message: 'Registration succesfull ! (PURUSHOTTAM !)', data }); //successfull calback
                                        }
                                    })
                                }
    
    
                            })
    
    
                        }
                    }
    
                })
    
    
    
    
            } catch (error) {
                console.log(error)
            }
        }
    
        login(loginData, callback) {
    
            try {
    
                console.log(`\n\n-->in model-->in login --> Email received : ${loginData.email}`);
    
                userModel.find({ 'email': loginData.email }, (err, data) => { //always a array is returned from the database
                    // for find method
    
                    if (err) {
                        callback(err + "Problem arised in finding email !")
                    } else {
                        if (data.length > 0) { // email match 
                            console.log("\n\n\tuser found ", data)
    
                            console.log(`\n\n\tEntered password : ${loginData.password}`)
    
                            console.log(`\n\n\tDatabase password : ${data[0].password}`)
    
                            let payload = {
                                _id: data[0]._id,
                            }
    
                            let tokenGenerated = generateToken.generateToken(payload)
    
                            bycrypt.compare(loginData.password, data[0].password, (err, bycryptResult) => {
    
                                if (err) {
    
                                    return callback(err);
                                } else { // password match
                                    if (bycryptResult) {
    
                                        console.log("\n\n\t LOGGED IN SUCCESFULLY  ...  !( PURUSHOTTAM )")
    
                                        let loginObject = {
                                            message: "LOGGED IN SUCCESSFULLY !",
                                            id: data[0]._id,
                                            name: data[0].firstName,
                                            email: data[0].email,
                                            token: tokenGenerated.token,
                                            data: bycryptResult
                                        }
    
                                        //return callback(null, data + "          LOGGED IN SUCCESFULLY !")
    
                                        return callback(null, loginObject);
                                    } else {
                                        console.log("\n\n\tCREDENTIALS DONT MATCH !");
    
                                        return callback(null, bycryptResult)
    
                                    }
                                }
                            })
                        }
                    }
                })
    
    
            } catch (error) {
                console.log(error)
            }
    
        }
    
        forgetPassword(forgetPasswordData, callback) {
    
            try {
                console.log(`\n\n\tIn model ---> forgot password api---> ${forgetPasswordData.email}`)
    
                userModel.find({ 'email': forgetPasswordData.email }, (err, data) => {
                    if (err) {
    
                        return callback(err + "problem found in finding email")
                    } else {
    
    
                        if (data.length > 0) //email found
                        {
    
                            console.log('\n\n\n\tmailing started')
                            console.log('\n\n\tdata in forget password model ---->', data[0]._id);
    
                            let payload = {
                                _id: data[0]._id
                            }
    
                            console.log("\n\n\t payload printed : " + JSON.stringify(payload))
    
                            let tokenObject = generateToken.generateToken(payload)
    
                            console.log("\n\ntoken object :" + tokenObject.token);
    
    
    
                            let url = "http://localhost:4000/#/resetPassword/" + tokenObject.token
    
                            generateMail.nodeMailer(forgetPasswordData.email, url, (err, data) => {
                                if (err) {
                                    return callback(err + "error generate while sending link ")
                                } else {
                                    return callback(null, data)
                                }
                            })
    
                        } else {
                            console.log("\n\n\n\t\tENTERED EMAIL NOT PRESENT IN DATABASE .... !")
                            return callback(null, false)
                        }
    
    
    
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    
        resetPassword(resetData, callback) {
    
            try {
    
                console.log(`\n\n-->in model-->in reset --> password received : ${resetData.password}`);
    
                let query = { '_id': resetData._id };
    
                hash(resetData.password, (err, hashedPassword) => {
                    if (err) {
                        return callback(err)
                    } else {
                        userModel.findOneAndUpdate(query, { $set: { 'password': hashedPassword } }, (err, data) => {
                            if (err) {
                                return callback(err + "       Error  in updating password !!!!!! ")
                            } else {
                                if (data) {
                                    console.log("\n\n\n\t Id of user : " + resetData._id)
                                    return callback(null, data + "     Password updated successfully !!!! ")
                                } else {
                                    return callback(null, data + " Password not updated !! ")
                                }
    
                            }
                        })
                    }
                })
    
    
    
    
            } catch (error) {
                console.log(error)
            }
    
        }
    
        allUsers(callback) {
            try {
    
                console.log("\n\n -----> In allUsers Model ...")
    
                userModel.find({}, ['firstName', 'lastName'], (err, data) => {
    
                    if (err) {
    
                        console.log("\n\nError generated while finding all users ... ")
                        return callback(err)
                    } else {
                        if (data.length > 0) {
                            console.log("\n\n\t\tALL USERS DISPLAYED SUCCESSFULLY !")
                            return callback(null, data)
                        } else {
                            return callback(null, false)
                        }
                    }
    
                })
            } catch (error) {
                console.log(error);
    
            }
        }
    }

let exportedUserClass=new UserModel();

module.exports=exportedUserClass;
