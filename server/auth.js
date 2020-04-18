async function isAllowedIn(db, token, role){
	values = {"token" : token, "role" : role};

	const result = await db.oneOrNone('SELECT * FROM employee WHERE username = ${token}', values);

	if (!result){
		return false;
	}
	else {
		return true;
	}
	//console.log(JSON.stringify(result));

	return false;
}

module.exports = {
	isAllowedIn : isAllowedIn
}