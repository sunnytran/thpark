const handleCustomerPut = (db) => (req, res) => {
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

const handleCustomerPost = (db) => async (req, res) => {
	const values = {first_name: req.body.first_name, last_name: req.body.last_name};

	const result = await db.one('INSERT INTO customer (first_name, last_name) VALUES (${first_name}, ${last_name}) RETURNING customer_id', values)

	res.json(result.customer_id);
	console.log(result);
}

module.exports = {
	handleCustomerPut: handleCustomerPut,
	handleCustomerPost: handleCustomerPost,
}