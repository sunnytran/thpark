const handleScannerPost = (db) => (req, res) => {
	if (body.req.type === "rideson"){
		db.query('SELECT * FROM rides_on ORDER BY timestamp DESC LIMIT 10')
		.then(function(data) {
			console.log(data);
			res.json(data);
		})
		.catch(function(error) {
			console.log('ERROR: ', error);
			res.status(400).json('');
		})
	}
	else if (body.req.type === "tickets"){
		db.query('SELECT * FROM sale WHERE sale_type=\'ticket\' ORDER BY timestamp DESC LIMIT 10')
		.then(function(data) {
			console.log(data);
			res.json(data);
		})
		.catch(function(error) {
			console.log('ERROR: ', error);
			res.status(400).json('');
		})
	}
	else if (body.req.type === "sales"){
		db.query('SELECT * FROM sale WHERE sale_type<>\'ticket\' ORDER BY timestamp DESC LIMIT 10')
		.then(function(data) {
			console.log(data);
			res.json(data);
		})
		.catch(function(error) {
			console.log('ERROR: ', error);
			res.status(400).json('');
		})
	}
	else if (body.req.type === "attends"){
		db.query('SELECT * FROM attends ORDER BY timestamp DESC LIMIT 10')
		.then(function(data) {
			console.log(data);
			res.json(data);
		})
		.catch(function(error) {
			console.log('ERROR: ', error);
			res.status(400).json('');
		})
	}
}

module.exports = {
	handleScannerPost: handleScannerPost,
}