//See all employees
//Add emplyee
//Update Employee

const handleStaffGet = (db) => (req, res) => {
	db.query('SELECT first_name, last_name FROM employee')
	.then(function(data) {
		//console.log(data);
		res.json(data);
	})
	.catch(function(error) {
		//console.log('ERROR: ', error);
		res.status(400).json('');
	})
	.finally(db.$pool.end);	
}

const handleStaffPost = (db) => (req, res) => {
	const values = {first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, password: req.body.password, access_level: req.body.access_level};

	db.none('INSERT INTO employee (first_name, last_name, username, password, access_level) VALUES (${first_name}, ${last_name}, ${username}, ${password}, ${access_level})', values)
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
	handleStaffGet: handleStaffGet,
	handleStaffPost: handleStaffPost
}