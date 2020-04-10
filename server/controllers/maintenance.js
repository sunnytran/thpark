const handleMaintenanceGet = (db) => (req, res) => {
	db.query('SELECT * FROM ride_issue')
	.then(function(data) {
		console.log(data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('');
	})
}

//Create
const handleMaintenancePost = (db) => (req, res) => {
	const values = {type: req.body.type, severity: req.body.severity, ride_name: req.body.ride_name};

	db.none('INSERT INTO ride_issue (type, severity, start_timestamp, ride_name) VALUES (${type}, ${severity}, (SELECT NOW()), ${ride_name})', values)
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
const handleMaintenancePut = (db) => (req, res) => {
	const values = {issue_id: req.body.issue_id};
	db.none('UPDATE ride_issue SET end_timestamp=(SELECT NOW()), resolved=true WHERE issue_id=${issue_id}', values)
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
	handleMaintenanceGet: handleMaintenanceGet,
	handleMaintenancePost: handleMaintenancePost,
	handleMaintenancePut: handleMaintenancePut
}