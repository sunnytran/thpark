const handleTicketPost = (db) => (req, res) => {
	//const current_time = Date.now();
	const values = {sale_type: 'ticket', sale_item: 'Park Ticket', sale_amount: '60', customer_id: req.body.customer_id, sale_from: 'Park Ticket Booth'};

	db.none('INSERT INTO sale (sale_type, sale_item, sale_amount, timestamp, customer_id, sale_from) VALUES (${sale_type}, ${sale_item}, ${sale_amount}, (SELECT NOW()), ${customer_id}, ${sale_from})', values)
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
	handleTicketPost: handleTicketPost
}