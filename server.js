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
const auth = require('./server/controllers/auth');
const rides = require('./server/controllers/rides');
const rideson = require('./server/controllers/rideson');
const shops = require('./server/controllers/shops');
const tickets = require('./server/controllers/tickets');
const sales = require('./server/controllers/sales');
const maintenance = require('./server/controllers/maintenance');
const rainouts = require('./server/controllers/rainouts');
const reports = require('./server/controllers/reports');
const staff = require('./server/controllers/staff');
const customer = require('./server/controllers/customer');
const events = require('./server/controllers/events');
const attends = require('./server/controllers/attends');
const scanner = require('./server/controllers/scanner');

//Database Connection---------------------------------------------------
//This is where we connect to the database
//This will require that the database is on your postgres and with the
//correct parameters filled in  - Andrew
const promise = require('bluebird');
const initOptions = {
	promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);

//Local Connection
/*const cn = {
	host: 'localhost',
	port: 5432,
	database: 'thparkdb',
	user: 'postgres',
	password: 'ezpasswrd123'
};*/

//Heroku Connection
const cn = {
	host: 'ec2-184-72-236-3.compute-1.amazonaws.com',
	port: 5432,
	database: 'd5qik25t1apem4',
	user: 'idlumctkwdprcn',
	password: 'a22954204b160e52d8c40bab4b8a0d8f3226dd45925df07d28c38b41a8b054ff'
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

/**********************************************************************
* IMPORTANT!
* If a request is commented out, it has not been secured with
* authentication yet. Be aware of the risks on uncommenting and using
* the code on the heroku server.
***********************************************************************/
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.prepare().then(() => {
	const server = express();

	let sco;

	/*db.connect()
	.then(obj => {
		sco = obj;
		sco.client.on('notification', function (data) {
	        console.log('Received:', data);
	        // data.payload = 'my payload string'
	    });
	    return sco.none('LISTEN event');
	})
	.catch(error => {
	    console.log('Error:', error);
	});*/

	server.use(logger('dev'));
	server.use(allowCrossDomain);

	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: false }));

	server.post('/api/login', login.handleLogin(db));
	server.post('/api/auth', auth.handleAuth(db));

	server.get('/api/rides', rides.handleRideGet(db));
	server.post('/api/rides', rides.handleRidePost(db));
	server.put('/api/rides', rides.handleRidePut(db));
	server.delete('/api/rides', rides.handleRideDelete(db));

	server.get('/api/rideson', rideson.handleRidesOnGet(db));
	server.post('/api/rideson', rideson.handleRidesOnPost(db));
	//server.delete('/api/rideson', rideson.handleRidesOnDelete(db)); //Doesn't work

	server.get('/api/shops', shops.handleShopGet(db));
	server.post('/api/shops', shops.handleShopPost(db));
	server.put('/api/shops', shops.handleShopPut(db));
	server.delete('/api/shops', shops.handleShopDelete(db));

	server.get('/api/tickets', tickets.handleTicketGet(db));
	server.post('/api/tickets', tickets.handleTicketPost(db));

	server.get('/api/sales', sales.handleSalesGet(db));
	server.post('/api/sales', sales.handleSalesPost(db));
	server.delete('/api/sales', sales.handleSalesDelete(db));

	server.get('/api/maintenance', maintenance.handleMaintenanceGet(db));
	server.post('/api/maintenance', maintenance.handleMaintenancePost(db));
	server.put('/api/maintenance', maintenance.handleMaintenancePut(db));

	server.get('/api/rainouts', rainouts.handleRainoutsGet(db));
	server.post('/api/rainouts', rainouts.handleRainoutsPost(db));

	server.post('/api/reports', reports.handleReportsPost(db));

	server.get('/api/staff', staff.handleStaffGet(db));
	server.post('/api/staff', staff.handleStaffPost(db));
	server.put('/api/staff', staff.handleStaffPut(db));
	server.delete('/api/staff', staff.handleStaffDelete(db));

	server.put('/api/customer', customer.handleCustomerPut(db));
	server.post('/api/customer', customer.handleCustomerPost(db));

	server.get('/api/events', events.handleEventsGet(db));
	server.post('/api/events', events.handleEventsPost(db));
	server.put('/api/events', events.handleEventsPut(db));
	server.delete('/api/events', events.handleEventsDelete(db));

	server.get('/api/attends', attends.handleAttendsGet(db));
	server.post('/api/attends', attends.handleAttendsPost(db));

	server.post('/api/scanner', scanner.handleScannerPost(db));

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

