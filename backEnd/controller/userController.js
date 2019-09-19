
/*************************************************************************
 * Execution        : 1. default node       cmd> nodemon controller.js
 * 
 * Purpose          : Request from the route is received and sent forward to service .
 *                    Also separate fields are retrieved from the request body. 
 * @file            : controller.js
 * @author          : Purushottam
 * @version         : 1.0
 * @since           : 5-08-2019
 * 
 **************************************************************************/


const service = require('../services/userService.js');


class UserController {
    constructor() { }

    /**
 * @description - A request is controlled properly , if request has a error
 *                a response is sent.
 */
    register  (req, res)  {
        try {

            req.checkBody('firstName', 'first name should not be empty').notEmpty();
            req.checkBody('firstName', 'first name should not contain anything other than alphabets').isAlpha()

            req.checkBody('lastName', 'last name should not be empty').notEmpty();
            req.checkBody('firstName', 'last name should not contain anything other than alphabets').isAlpha()

            req.checkBody('email', 'email name should not be empty').notEmpty();
            req.checkBody('email', 'email should be valid').isEmail();

            req.checkBody('password', 'password name should not be empty').notEmpty();
            req.checkBody('password', 'password should be atleast 6 letters').isLength({ min: 6 });
            req.checkBody('password', 'password cannot be greater than 20 characters').isLength({ max: 20 });


            let errorsGenerated = req.validationErrors()  //inbulit method

            let response = {}; //empty array is declared

            console.log(`Validation error : ${errorsGenerated}`);

            /**
              * @description - Validating the request 
              */
            if (errorsGenerated) {
                response.success = false;
                response.message = "Erros are generated while validating in controller ";
                response.error = errorsGenerated;

                return res.status(422).send(response);  //The 422 (Unprocessable Entity)
            }
            else {
                /**
                 * @description - From registration data's body fields are made and a object
                 *                is passed on to service below . 
                 */
                let registrationData = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                }

                /**
                * @description - Data succesfully passed on to service .
                */
                service.registerService(registrationData, (err, data) => {

                    if (err) {
                        response.success = false;
                        response.error = err;

                        return res.status(400).send(response); //400 is bad request error
                        //also response will be printed on the postman pretty
                    }
                    else {
                        response.success = true;
                        response.result = data;

                        return res.status(200).send(response); //200 is ok status response code
                        //also response will be printed on the postman pretty
                    }

                })

            }
        } catch (error) {
            console.log(error)
        }


    }

    login (req, res)  {

        try {

            req.checkBody('email', 'email id should not be empty').notEmpty();
            req.checkBody('email', 'email should be valid').isEmail();

            req.checkBody('password', 'password name should not be empty').notEmpty();
            req.checkBody('password', 'password should be atleast 6 letters').isLength({ min: 6 });
            req.checkBody('password', 'password cannot be greater than 20 characters').isLength({ max: 20 });


            let errorsGenerated = req.validationErrors()  //inbulit method

            let response = {}; //empty array is declared

            console.log(`Validation error : ${errorsGenerated}`);

            /**
              * @description - Validating the request 
              */
            if (errorsGenerated) {

                response.success = false;
                response.error = errorsGenerated;

                return res.status(422).send(response);  //The 422 (Unprocessable Entity)

            }
            else {

                /**
                * @description - From login data's body fields are made and a object
                 *                is passed on to service below . 
                 */
                let loginData = {
                    email: req.body.email,
                    password: req.body.password
                }


                /**
                * @description - Data succesfully passed on to service .
                */
                service.loginService(loginData, (err, data) => {

                    if (err) {
                        response.success = false;
                        response.error = err;

                        return res.status(400).send(response); //400 is bad request error
                        //also response will be printed on the postman pretty
                    }
                    else {
                        response.success = true;
                        response.result = data;

                        return res.status(200).send(response); //200 is ok status response code
                        //also response will be printed on the postman pretty
                    }
                })
            }

        }
        catch (error) {
            console.log(error)
        }

    }

    forgetPassword = (req, res) => {

        try {

            req.checkBody('email', 'email id should not be empty').notEmpty();
            req.checkBody('email', 'email should be valid').isEmail();

            let errorsGenerated = req.validationErrors()  //inbulit method

            let response = {}; //empty array is declared

            console.log(`Validation error : ${errorsGenerated}`);

            /**
              * @description - Validating the request 
              */
            if (errorsGenerated) {

                response.success = false;
                response.error = errorsGenerated;

                return res.status(422).send(response);  //The 422 (Unprocessable Entity)

            }
            else {

                /**
                * @description - From forget data's body fields are made and a object
                 *                is passed on to service below . 
                 */
                let forgetPasswordData = {
                    email: req.body.email
                }

                console.log("\n\n\t forget pass :", forgetPasswordData);


                /**
                * @description - Data succesfully passed on to service .
                */
                service.forgetPasswordService(forgetPasswordData, (err, data) => {

                    if (err) {
                        response.success = false;
                        response.error = err;

                        return res.status(400).send(response); //400 is bad request error
                        //also response will be printed on the postman pretty
                    }
                    else {
                        response.success = true;
                        response.result = data;

                        return res.status(200).send(response); //200 is ok status response code
                        //also response will be printed on the postman pretty
                    }
                })
            }

        }
        catch (error) {
            console.log(error)
        }

    }

    resetPassword = (req, res) => {

        try {
            console.log('Reset password body ', req.token._id);

            req.checkBody('password', 'password name should not be empty').notEmpty();
            req.checkBody('password', 'password should be atleast 6 letters').isLength({ min: 6 });
            req.checkBody('password', 'password cannot be greater than 20 characters').isLength({ max: 20 });



            let errorsGenerated = req.validationErrors()  //inbulit method

            let response = {}; //empty array is declared

            console.log(`Validation error : ${errorsGenerated}`);

            /**
              * @description - Validating the request 
              */
            if (errorsGenerated) {

                response.success = false;
                response.error = errorsGenerated;

                return res.status(422).send(response);  //The 422 (Unprocessable Entity)

            }
            else {

                /**
                * @description - From reset data's body fields are made and a object
                 *                is passed on to service below . 
                 */
                let resetPasswordData = {
                    password: req.body.password,
                    _id: req.token._id
                }


                /**
                * @description - Data succesfully passed on to service .
                */
                service.resetPasswordService(resetPasswordData, (err, data) => {

                    if (err) {
                        response.success = false;
                        response.error = err;

                        return res.status(400).send(response); //400 is bad request error
                        //also response will be printed on the postman pretty
                    }
                    else {
                        response.success = true;
                        response.result = data;

                        return res.status(200).send(response); //200 is ok status response code
                        //also response will be printed on the postman pretty
                    }
                })
            }

        }
        catch (error) {
            console.log(error)
        }

    }

    allUsersController = (req, res) => {
        try {
            /**
            * @description - Data succesfully passed on to service .
            */
            service.allUsersService((err, data) => {

                console.log("\n\n -----> In allUsers controller ...")

                let response = {}

                if (err) {
                    response.success = false;
                    response.error = err;

                    return res.status(400).send(response); //400 is bad request error
                    //also response will be printed on the postman pretty
                }
                else {
                    response.success = true;
                    response.result = data;

                    return res.status(200).send(response); //200 is ok status response code
                    //also response will be printed on the postman pretty
                }

            })

        }
        catch (error) {
            console.log(error)
        }


    }


}

let exportedUserController= new UserController()

module.exports=exportedUserController;
