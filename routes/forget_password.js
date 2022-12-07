const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.json({ status: 'error', error: error.details[0].message });

        const userData = await User.findOne({ email: req.body.email });
        // console.log(userData);
        if (userData) {
            const randonString = randomstring.generate();
            await User.updateOne({ email: req.body.email }, { $set: { f_token: randonString } });
            sendResetPasswordMail(userData.name, userData.email, randonString)
            return res.json({ status: 'ok', message: 'Mail Sent Successfully' })

        }
        else {
            return res.json({ status: 'error', error: 'User Email Incorrect' })
        }
    } catch (error) {
        return res.json({ status: 'error', error: 'Internal Server Error' })
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
    });
    return schema.validate(data);
};

const sendResetPasswordMail = async (name, email, token) => {
    try {
        const mailOptions = {
            from: process.env.EMAILUSER,
            to: email,
            subject: "For Reset Password",
            html: '<p1> ' + name + ' , please click the link and <a href="http://localhost:8080/reset_password?token=' + token + '" >reset your password </a>'
            // text: "first sender"
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            // port: 465,
            port: 587,
            secure: false,
            requireTLS: true,
            service: "gmail",
            auth: {
                user: process.env.EMAILUSER,
                pass: process.env.EMAILPASS
            },
        });

        transporter.sendMail(mailOptions, (err,info) => {
            if (err) {
                return console.log(err);
            } else {
                return console.log("email sent:- ",info.response);
            }
        });

    } catch (error) {
        return console.log("internal server error", error);
    }
};

module.exports = router;