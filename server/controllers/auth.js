const auth = require('../auth');

const handleAuth = (db) => (req, res) => {
	
	const token = {token: req.body.token};

	if (auth.isAllowedIn(db, token, 'none') === true){
		res.json(true);
	}
	else{
		res.json(false);
	}
}

module.exports = {
	handleAuth: handleAuth
}