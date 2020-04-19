const handleRainoutsGet = (db) => (req, res) => {
	db.query('SELECT * FROM rainouts ORDER BY date DESC LIMIT 10')
	.then(function(data) {
		console.log(data);
		res.json(data);
	})
	.catch(function(error) {
		//console.log('ERROR: ', error);
		res.status(400).json('');
	})
}

const handleRainoutsPost = (db) => (req, res) => {
	db.none('INSERT INTO rainouts (date, start_timestamp) VALUES (CURRENT_DATE, NOW())')
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Unavailable');
	})
}

module.exports = {
	handleRainoutsGet: handleRainoutsGet,
	handleRainoutsPost: handleRainoutsPost
}