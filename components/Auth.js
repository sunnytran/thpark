import Cookies from "js-cookie";
import {url} from '../components/Const';

//Please do not mess with these functions
//Unless you really know what your doing

export async function attemptLogin(username, password){
	const data = {"username" : username, "password" : password};

	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
	headers.append('Origin', url);

	await fetch(url + "/api/login", {
		body: JSON.stringify(data),
		headers: headers,
		method: 'POST',
		mode: 'cors'
	})
	.then(res => res.json())
	.then (
		(result)=> {
			//console.log(result);
			Cookies.set("token", result[0].username, {expires: 1});
	})
	.catch(error => console.log(error));
}

export function logout(){
	Cookies.remove("token");
}

export async function isLoggedIn(){
	const token = await Cookies.get("token");
	//console.log("Cookie: " + token);

	if (token === undefined) {return false;}

	const data = {"token" : token};

	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
	headers.append('Origin', url);

	const res = await fetch(url + "/api/auth", {
		body: JSON.stringify(data),
		headers: headers,
		method: 'POST',
		mode: 'cors'
	});
	const result = await res.json();

	//console.log("RESULT: " + result);
	return result;
}

export async function getRole(role){
	const token = await Cookies.get("token");
	if (token === undefined) {return "none";}

	const data = {"token" : token};

	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Accept', 'application/json');
	headers.append('Origin', url);

	const res = await fetch(url + "/api/role", {
		body: JSON.stringify(data),
		headers: headers,
		method: 'POST',
		mode: 'cors'
	});
	const result = await res.json();
	return result.role;
}