const handleRidesOnGet = (db) => (req, res) => {
	db.query('SELECT * FROM rides_on')
	.then(function(data) {
		console.log(data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Error');
	})
}

//Create
const handleRidesOnPost = (db) => (req, res) => {
	const values = {ride_name: req.body.ride_name, customer_id: req.body.customer_id};

	db.none('INSERT INTO rides_on (ride_name, customer_id, timestamp) VALUES (${ride_name}, ${customer_id}, (SELECT NOW()))', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}

const handleRidesOnDelete = (db) => (req, res) => {
	const values = {ride_name: req.body.ride_name, customer_id: req.body.customer_id, timestamp: req.body.timestamp};
	db.none('DELETE FROM rides_on WHERE ride_name=${ride_name} AND customer_id = ${customer_id} AND timestamp = ${timestamp}', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}

module.exports = {
	handleRidesOnGet: handleRidesOnGet,
	handleRidesOnPost: handleRidesOnPost,
	handleRidesOnDelete: handleRidesOnDelete
}