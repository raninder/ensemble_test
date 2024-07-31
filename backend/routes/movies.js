const express = require("express");
const router = express.Router();


module.exports = (db) => {

router.get('/getallmovies', (req, res) => {
	db.query(
		`SELECT * FROM movies;`)
					
						
	.then((data) => {
		res.json(data.rows);
	})
});
return router;
};