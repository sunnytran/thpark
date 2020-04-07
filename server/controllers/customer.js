const handleCustomerGet = (db) => (req, res) => {
	const name = {first_name: req.body.first_name, last_name: req.body.last_name};
	db.query('SELECT * FROM customer WHERE first_name=${first_name} AND last_name=${last_name}', name)
	.then(function(data) {
		console.log(data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('');
	})
}

const handleCustomerPost = (db) => (req, res) => {
	const values = {first_name: req.body.first_name, last_name: req.body.last_name};

	db.none('INSERT INTO customer (first_name, last_name) VALUES (${first_name}, ${last_name})', values)
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
	handleCustomerGet: handleCustomerGet,
	handleCustomerPost: handleCustomerPost,
}