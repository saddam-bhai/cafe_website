const router = require("express").Router();
const { Order, validate } = require("../models/order");
const checkAuth = require("../middleware/check_auth");

router.post("/",checkAuth, async (req, res) => { 
    try {
        const { error } = validate(req.body);
        if (error)
            return res.json({ status: 'error', error: error.details[0].message });

        await new Order({...req.body}).save()
        return res.json({ status: 'ok', message: 'Order Successfully' })

    } catch (error) {
        return res.json({ status: 'error', error: 'Internal Server Error' })
    }
});

module.exports = router;

