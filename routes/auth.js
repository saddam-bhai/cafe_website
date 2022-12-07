const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
			return res.json({ status: 'error', error: error.details[0].message });


        const user = await User.findOne({ email: req.body.email });
        if (!user)
			return res.json({ status: 'error', error: "User Email Not Found" });

        const validPassword = await bcrypt.compare(
            req.body.password,user.password
        );
        if (!validPassword)
            return res.json({ status: 'error', error: "Wrong Password" });


        const token = user.generateAuthToken();
        res.cookie("mytoken",token,{
            httpOnly:true
        });
        
        const myemail = req.body.email;
        // console.log(myemail);
        res.cookie("myemail",myemail);

        return res.json({ status: 'ok', data:token, message: "Logged in successfully" });

        
    } catch (error) {
        return res.json({ status: 'error', error: "Internal server Error" });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;