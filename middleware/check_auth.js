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
        next();
    } catch (error) {
        return res.json({ status: 'error', error: "Please Sign in Again!!" });
    } 
}

