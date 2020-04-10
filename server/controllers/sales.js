const handleSalesGet = (db) => (req, res) => {
	const values = {shop_name: req.body.shop_name};
	db.query('SELECT * FROM sale WHERE sale_from=${shop_name}', values)
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
const handleSalesPost = (db) => (req, res) => {
	const values = {sale_type: req.body.sale_type, sale_item: req.body.sale_item, sale_amount: req.body.sale_amount, customer_id: req.body.customer_id, sale_from: req.body.sale_from};

	db.none('INSERT INTO sale (sale_type, sale_item, sale_amount, timestamp, customer_id, sale_from) VALUES (${sale_type}, ${sale_item}, ${sale_amount}, (NOW()), $(customer_id), $(sale_from))', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}


const handleSalesDelete = (db) => (req, res) => {
	const values = {transaction_id: req.body.transaction_id};
	db.none('DELETE FROM sale WHERE transaction_id=${transaction_id}', values)
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
	handleSalesGet: handleSalesGet,
	handleSalesPost: handleSalesPost,
	handleSalesDelete: handleSalesDelete
}