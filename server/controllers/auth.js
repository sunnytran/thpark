const auth = require('../auth');

const handleAuth = (db) => async (req, res) => {
	const token = req.body.token;

	const result = await auth.isAllowedIn(db, token, 'none')

	res.json(result);
}

const handleRole = (db) => async (req, res) => {
	const token = req.body.token;
	const values = {"token" : token};

	const result = await db.oneOrNone('SELECT access_level as role FROM employee WHERE username = ${token}', values);

	res.json(result);
}


module.exports = {
	handleAuth: handleAuth,
	handleRole: handleRole,
}