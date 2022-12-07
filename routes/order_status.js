const router = require("express").Router();
const { Order } = require("../models/order");

router.post("/", async (req, res) => {
    try {
        const oid = req.body.oid;
        const ns = req.body.ns;
        // console.log(ns);

        const userData = await Order.findOne({ _id: oid })
        if (userData) {
            const data = await Order.findByIdAndUpdate({ _id: oid }, { $set: { ostatus: ns } },{new:true});
            // console.log(data);
            return res.json({ status: 'ok', message: 'Status Updated Successfully' })
        }
        else {
            return res.json({ status: 'error', error: 'Something Went Wrong' })
        }
    } catch (error) {
        return res.json({ status: 'error', error: 'Internal Server Error' })
    }
});

module.exports = router;