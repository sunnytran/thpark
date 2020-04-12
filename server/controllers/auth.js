/*const handleAuth = (db) => (req, res) => {
	const token = {token: req.body.token};

	db.query('SELECT * FROM employee ${token}', token)
	.then(function(data) {
		//console.log(data);
		if (data[0] != 'undefined'){
			res.json(data[0]);
		}
		else {
			res.status(400).json('Wrong credentials');
			//res.status(400).json(req.body);
		}
	})
	.catch(function(error) {
		//console.log('ERROR: ', error);
		res.status(400).json('Wrong credentials');
	})
}

module.exports = {
	handleLogin: handleLogin
}*/