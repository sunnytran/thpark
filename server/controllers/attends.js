const handleAttendsGet = (db) => (req, res) => {
	const values = {event_id: req.body.event_id};
	db.query('SELECT * FROM attends WHERE event_id=${event_id}', values)
	.then(function(data) {
		console.log(data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}

//Create
const handleAttendsPost = (db) => (req, res) => {
	const values = {event_id: req.body.event_id, customer_id: req.body.customer_id};

	db.none('INSERT INTO attends (event_id, customer_id, timestamp) VALUES (${event_id}, ${customer_id}, NOW())', values)
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
	handleAttendsGet: handleAttendsGet,
	handleAttendsPost: handleAttendsPost
}