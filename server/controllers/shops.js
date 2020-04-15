const handleShopGet = (db) => (req, res) => {
	db.query('SELECT * FROM shop')
	.then(function(data) {
		console.log(data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('');
	})
}

const handleShopPost = (db) => (req, res) => {
	const values = {shop_name: req.body.shop_name, location: req.body.location, creation_date: req.body.creation_date, shop_type: req.body.shop_type};

	db.none('INSERT INTO shop (shop_name, location, creation_date, shop_type) VALUES (${shop_name}, ${location}, ${creation_date}, ${shop_type})', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}

const handleShopPut = (db) => (req, res) => {
	const values = {target_name: req.body.target_name, shop_name: req.body.shop_name, location: req.body.location};

	if (values.target_name === "Park Ticket Booth"){
		res.status(400).json('Cannot Change Park Ticket Booth');
		return;
	}

	db.none('UPDATE shop SET shop_name=${shop_name}, location=${location} WHERE shop_name = ${target_name}', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}

const handleShopDelete = (db) => (req, res) => {
	const name = {name: req.body.name};
	db.none('DELETE FROM shop WHERE shop_name = ${name}', name)
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
	handleShopGet: handleShopGet,
	handleShopPost: handleShopPost,
	handleShopPut: handleShopPut,
	handleShopDelete: handleShopDelete
}