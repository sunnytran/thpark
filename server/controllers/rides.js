const handleRideGet = (db) => (req, res) => {
	db.query('SELECT * FROM ride')
	.then(function(data) {
		//console.log(data);
		res.json(data);
	})
	.catch(function(error) {
		//console.log('ERROR: ', error);
		res.status(400).json('');
	})
}

//Create
const handleRidePost = (db) => (req, res) => {
	const values = {ride_name: req.body.ride_name, ride_type: req.body.ride_type, creation_date: req.body.creation_date, location: req.body.location, ride_status: req.body.ride_status, 
		last_inspection: req.body.last_inspection, insurance_expiration_date: req.body.insurance_expiration_date};

	db.none('INSERT INTO ride (ride_name, ride_type, creation_date, location, ride_status, last_inspection, insurance_expiration_date) VALUES (${ride_name}, ${ride_type}, ${creation_date}, ${location}, ${ride_status}, $(last_inspection), $(insurance_expiration_date))', values)
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
const handleRidePut = (db) => (req, res) => {
	const values = {target_name: req.body.target_name, ride_name: req.body.ride_name, ride_type: req.body.ride_type, creation_date: req.body.creation_date, location: req.body.location, ride_status: req.body.ride_status, 
		last_inspection: req.body.last_inspection, insurance_expiration_date: req.body.insurance_expiration_date};
	db.none('UPDATE ride SET ride_name=${ride_name}, ride_type=${ride_type}, creation_date=${creation_date}, location=${location}, ride_status=${ride_status}, last_inspection=$(last_inspection), insurance_expiration_date=$(insurance_expiration_date) WHERE ride_name=${target_name}', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}

const handleRideDelete = (db) => (req, res) => {
	const name = {name: req.body.name};
	db.none('DELETE FROM ride WHERE ride_name=${name}', name)
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
	handleRideGet: handleRideGet,
	handleRidePost: handleRidePost,
	handleRidePut: handleRidePut,
	handleRideDelete: handleRideDelete
}