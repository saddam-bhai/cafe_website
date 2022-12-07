const router = require("express").Router();
const checkAuth = require("../middleware/check_auth");
const MongoClient = require('mongodb').MongoClient;

router.post("/", checkAuth, async (req, res) => {
	try {
		MongoClient.connect(process.env.DB, function (err, db) {
			if (err) throw err;
			var dbo = db.db("registration");
			dbo.collection("orders").find({},{ projection: { } }).toArray(function (err, data) {
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