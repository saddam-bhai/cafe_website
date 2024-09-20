const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
app.use(cookieParser());


module.exports = (req, res, next) => {
    // console.log(req.cookies.token);
    const mytoken = req.cookies.mytoken;
    if (!mytoken)
        return res.json({ status: 'error', error: "Please Sign in Again!!" });

    try {
        const verify = jwt.verify(mytoken,process.env.JWTPRIVATEKEY);
        if(verify._id == "63787d92f6a8bfd56d0b51b8"){
            next();
        }else{
            return res.json({ status: 'error', error: "You Are Not An Admin!!" });
        }
    } catch (error) {
        return res.json({ status: 'error', error: "Please Sign in Again!!" });
    } 
}
