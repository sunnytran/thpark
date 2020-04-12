async function isAllowedIn(db, token, role){
	values = {"token" : token, "role" : role};
	
	const result = await db.oneOrNone('SELECT * FROM employee WHERE username = ${token}', values);

	if (!result){
		return false;
	}
	else if (result.username === values.token){
		return true;
	}
	//console.log(JSON.stringify(result));

	return false;
}

module.exports = {
	isAllowedIn : isAllowedIn
}