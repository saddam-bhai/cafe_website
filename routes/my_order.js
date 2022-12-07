const router = require("express").Router();
const checkAuth = require("../middleware/check_auth");
const MongoClient = require('mongodb').MongoClient;

router.post("/", checkAuth, async (req, res) => {
	try {
		// const myemail = req.body.email;
		const myemail = req.cookies.myemail;

		MongoClient.connect(process.env.DB, function (err, db) {
			if (err) throw err;
			var dbo = db.db("registration");
			dbo.collection("orders").find({"email":myemail},{ projection: { _id: 0 } }).toArray(function (err, data) {
				if (err) throw err;
				// console.log(data);
				db.close();
				res.status(200).json(data);
			});
		});
		
		
	} catch (error) {
		return res.json({ status: 'error', error: 'Internal Server Error' })
	}
});

module.exports = router;