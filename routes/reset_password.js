const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.json({ status: 'error', error: error.details[0].message }); 

        const token = req.body.token;
        // console.log(token);
        if (!token)
            return res.json({ status: 'error', error: "Invalid link" });

        const tokenData = await User.findOne({ f_token: token })
        if (tokenData) {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const newPassword = await bcrypt.hash(password, salt);
            const userData = await User.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: newPassword,f_token:'' } },{new:true});
            // console.log(userData);
            return res.json({ status: 'ok', message: 'Password Reset Successfully' })
        }
        else {
            return res.json({ status: 'error', error: 'Link Is Expired Or Invalid' })
        }
    } catch (error) {
        return res.json({ status: 'error', error: 'Internal Server Error' })
    }
});

const validate = (data) => {
    const schema = Joi.object({
        password: Joi.string().required().label("Password"),
        token: Joi.string().allow('', null).label("Token"),
    });
    return schema.validate(data);
};

module.exports = router;