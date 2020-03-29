//Express Server
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Database
const promise = require('bluebird');
const initOptions = {
	promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);

const cn = {
	host: 'localhost',
	port: 5432,
	database: 'thparkdb',
	user: 'postgres',
	password: 'ezpasswrd123'
};

const db = pgp(cn);

//Database Query Example

db.query('SELECT * FROM employee WHERE first_name=$1', 'Andrew')
	.then(function(data) {
		console.log(data);
	})
	.catch(function(error) {
		console.log('ERROR: ', error);
	})
	.finally(db.$pool.end);

//Simple Routes

//get - get data
//put - update data
//post - create data
//delete - remove data

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/user', (req, res) => {
	res.send('User Page');
});

//Startup server
app.listen(port, () => console.log('Server is listening on port ' + port));