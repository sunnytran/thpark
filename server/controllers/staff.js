//See all employees
//Add emplyee
//Update Employee

const handleStaffGet = (db) => (req, res) => {
	db.query('SELECT employee_id, first_name, last_name, username, access_level FROM employee')
	.then(function(data) {
		//console.log(data);
		res.json(data);
	})
	.catch(function(error) {
		//console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
}

const handleStaffPut = (db) => (req, res) => {
	const values = {employee_id: req.body.employee_id, password: req.body.password};
	db.none('UPDATE employee SET password=${password} WHERE employee_id = ${employee_id}', values)
	.then (function(data){
		console.log('Data: ', data);
		res.json(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
		res.status(400).json('Invalid Input');
	})
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

const handleStaffDelete = (db) => (req, res) => {
	const employee_id = {employee_id: req.body.employee_id};
	db.none('DELETE FROM employee WHERE employee_id=${employee_id}', employee_id)
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
	handleStaffPut: handleStaffPut,
	handleStaffPost: handleStaffPost,
	handleStaffDelete: handleStaffDelete
}