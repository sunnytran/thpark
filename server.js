const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const app = next({dev});
const handle = app.getRequestHandler();
const { parse } = require('url');

//Controllers - Where the SQL queries are made in the code
const login = require('./server/controllers/login');
const rides = require('./server/controllers/rides');
const staff = require('./server/controllers/staff');

//Database Connection---------------------------------------------------
//This is where we connect to the database
//This will require that the database is on your postgres and with the
//correct parameters filled in  - Andrew
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

//Example query
/*db.query('SELECT * FROM employee WHERE username = ${username} AND password = crypt(${password}, password)', 
{username: 'av21', password: 'monster'})
.then(function(data) {
	console.log(data);
})
.catch(function(error) {
	console.log('ERROR: ', error);
})
.finally(db.$pool.end);*/
//---------------------------------------------------------------------

app.prepare().then(() => {
	const server = express();
	server.use(logger('dev'));

	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: false }));

	server.post('/api/login', login.handleLogin(db));

	server.get('/api/rides', rides.handleRideGet(db));
	server.post('/api/rides', rides.handleRidePost(db));

	server.get('/api/staff', staff.handleStaffGet(db));
	server.post('/api/staff', staff.handleStaffPost(db));

	server.get('*', (req, res) => {
		return handle(req, res);
	});

	//Port is important to work on heroku! Please don't change this
	//-Andrew
	const PORT = process.env.PORT || 3000;
	server.listen(PORT, (err) => {
		if (err)
			throw err;
		console.log('Server is ready on port: ' + PORT);
	});

});

