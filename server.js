const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const pathMatch = require('path-match');
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');

app.prepare().then(() => {
	const server = express();

	server.use(logger('dev'));

	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: false }));
	//server.use(session({
		//secret: 'secret',
		//resave: false,
		//saveUninitialized: false,
		//cookie: { maxAge: 60000 }
	//}));

	//server.use('/api', apiRoutes);

	server.get('*', (req, res) => {
		return handle(req, res);
	});

	var PORT = process.env.PORT || 3000;
	server.listen(PORT, (err) => {
		if (err)
			throw err;
		console.log('Server is ready on http://localhost:3000');
	});

});

//const apiRoutes = require('./server/routes/apiRoutes.js');
//const { Pool } = require("pg");
//const fs = require("fs");

//const client = new Pool({
	//user: "",
	//host: "",
	//database: "",
	//password: "",
	//port: ""
//});

//// get
//app.get("/", (req, resp) => {
	//console.log('req: ${req}');
	//console.log('resp: ${resp}');

	//resp.sendFile(htmlPath);
//});

//// post
//app.post("/query", function(req, resp) {
	//let userQuery = req.body.query;
	//console.log('\nuserQuery: ${typeof userQuery}');
	//console.log('${userQuery}');

	//let htmlData = fs.readFileSync("./index.html", "utf8");

	//let html = 'var tableData = "QUERY: ${userQuery}";';

	//resp.send(htmlData + '' + html);
//});

