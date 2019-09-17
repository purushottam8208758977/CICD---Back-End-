let jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {

    generateToken(payload) {
        
        let token = jwt.sign(payload, process.env.UNIQUE_KEY, { expiresIn: '24h' }) //combines the unique id and the private key 

        let object = {
            success: true,
            message: "token generated",
            token: token
        }
        
        return object;

    },

    verifyToken(req, res, next) {

        let token = req.body.token;

        console.log("\n\n\tToken in verify token method :",token);
        
        if (token) {
            jwt.verify(token, process.env.UNIQUE_KEY, (err, data) => {
                if (err) {

                    res.status(400).send(err)
                }
                else {
                    console.log("TOKEN :"+JSON.stringify(data));
                    req.token=data; //token added in the request process
                    next(); //passes to the next argument in route --->controller
                }
            })
        }
        else{
            console.log("\n\n\tTOKEN NOT RECEIEVED");
            res.status(400).send("         TOKEN NOT RECEIVED !!! ")
        }

    }

}
