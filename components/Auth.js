import Cookies from "js-cookie";

//These functions will probably change when we add authentication

export function attemptLogin(username, password){
	const data = {"username" : username, "password" : password};

	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
	headers.append('Origin', 'https://www.tpmanagement.app');
	

	fetch("https://www.tpmanagement.app/api/login", {
		body: JSON.stringify(data),
		headers: headers,
		method: 'POST',
		mode: 'cors'
	})
	.then(res => console.log(res))
	.then (
		(result)=> {
			console.log(result);
			Cookies.set("token", result[0], {expires: 1});
	})
	.catch(error => console.log(error));
}

export function logout(){
	Cookies.remove("token");
}

export function isLoggedIn(){
	const data = Cookies.get("token");

	if (data === undefined) {return false;}

	return true;
}