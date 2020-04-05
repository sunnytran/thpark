const handleRainoutsGet = (db) => (req, res) => {
	db.query('SELECT * FROM rainouts')
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
	db.none('INSERT INTO rainouts (date) VALUES (CURRENT_DATE)')
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