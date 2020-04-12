const auth = require('../auth');

const handleAuth = (db) => async (req, res) => {
	
	const token = req.body.token;

	const result = await auth.isAllowedIn(db, token, 'none')

	res.json(result);
}

module.exports = {
	handleAuth: handleAuth
}