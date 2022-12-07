const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.json({ status: 'error', error: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res.json({ status: 'error', error: 'User with given email already Exist!' })
			

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		return res.json({ status: 'ok', message: 'User Created Successfully' })
	} catch (error) {
		return res.json({ status: 'error', error: 'Internal Server Error' })
	}
});

module.exports = router;