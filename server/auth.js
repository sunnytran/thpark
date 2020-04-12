function isAllowedIn(db, token, role){
	values = {"token" : token, "role" : role};
	db.query('SELECT username FROM employee WHERE username = ${token} AND access_level = ${role}', values)
	.then(function(data) {
		console.log(data);
		if (data[0] != 'undefined'){
			return true;
		}
		else {
			return false;
		}
	})
	.catch(function(error) {
		return false;
	});

	return false;
}

module.exports = {
	isAllowedIn : isAllowedIn
}