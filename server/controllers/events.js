const handleEventsGet = (db) => (req, res) => {
	db.query('SELECT * FROM event WHERE date >= CURRENT_DATE')
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
const handleEventsPost = (db) => (req, res) => {
	const values = {event_name: req.body.event_name, event_type: req.body.event_type, date: req.body.date, location: req.body.location};

	db.none('INSERT INTO event (event_name, event_type, date, location) VALUES (${event_name}, ${event_type}, ${date}, ${location})', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}

//Update
const handleEventsPut = (db) => (req, res) => {
	const values = {event_id: req.body.event_id, date: req.body.date};
	db.none('UPDATE event SET date = ${date} WHERE event_id=${event_id}', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}

const handleEventsDelete = (db) => (req, res) => {
	const values = {event_id: req.body.event_id};
	db.none('DELETE FROM event WHERE event_id=${event_id}', values)
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
	handleEventsGet: handleEventsGet,
	handleEventsPost: handleEventsPost,
	handleEventsPut: handleEventsPut,
	handleEventsDelete: handleEventsDelete
}