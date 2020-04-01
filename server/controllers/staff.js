//See all employees
//Add emplyee
//Remove employee

/*const handleStaffGet = (db) => (req, res) => {
	const credentials = {username: req.body.username, password: req.body.password};

	db.query('SELECT * FROM employee',)
	.then(function(data) {
		//console.log(data);
			res.json(data);
		}
		else {
			res.status(400).json('');
		}
	})
	.catch(function(error) {
		//console.log('ERROR: ', error);
		res.status(400).json('');
	})
	.finally(db.$pool.end);	
}

module.exports = {
	handleStaffGet: handleStaffGet
}*/