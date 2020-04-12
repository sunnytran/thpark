/***********************************************************************
*	WHAT TO DO
*	I wrote some functions for you guys to use to start working on login
*	These functions are not 100% secure yet, but they are good enough
*	to make the login work. I also reorganized the code a little to help
*	you start working on this.
*
*	Here's what you can do
*
*	1. Use the login functions to login the user
*	2. Show an error message if login in invalid
*	3. Redirect the page to the homepage if the login is valid
*	4. If the user is already logged in, automatically redirect the
*	user to the homepage
*	
*	Let me know when you guys finish, and I'll let you 
*	know what to do next
*
*	Tips
*	Look at the "componentDidMount" method
*	Use google, a lot
***********************************************************************/

/***********************************************************************
*	Functions to use!
* 	All function are from: import {attemptLogin, logout, isLoggedIn} from '../components/Auth';
*
*	attemptLogin(username, password); - will check the database if the
*	user exists, and will make a cookie with token if true
*
*	attemptLogin("av21", "monster"); - Valid Creditinals: Cookie made
*	attemptLogin("notauser", "baspassword"); - Invalid Creditinals: No 
*	cookie made
*
*	logout(); - will remove the cookie if a user is logged in
*
*	isLoggedIn(); - will check the cookie, compare the cookie to the
*	database
*	Will return true if the cookie is valid
*	Will return false if the cookie is invalid or does not exist
***********************************************************************/

//This is old code I removed, you can put it back for testing if you need it
//<form action="https://wp.zybooks.com/form-viewer.php" target="_blank" method="POST">

import React from "react";
import Login_Register_Layout from '../components/Login_Register_Layout';
import {attemptLogin, logout, isLoggedIn} from '../components/Auth';

class Login extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			username: "",
			password: ""
		}
	}

	//ComponentDidMount is what the webpage does when its loaded or reloaded
	//IMPORTANT: The frontend does functions out of sync, so not everything
	//may finish in order unless you explicitly make it do so
	async componentDidMount(){
		let test = await isLoggedIn();
		console.log("Is logged in? " + test);
	}

	render(){
		return (
				<Login_Register_Layout>
					<div className="container">

						<form>
							<div className="notification">
								<div className="field">
									<label className="label">Username</label>
									<div className="control">
										<input className="input" name="username" type="text" placeholder="Username"/>
									</div>
								</div>
								<div className="field">
									<label className="label">Password</label>
									<div className="control">
										<input className="input" name="password" type="text" placeholder="********"/>
									</div>
								</div>

								<div className="field is-grouped">
									<div className="control">
										<input className="button is-link" type="submit" value="Submit"/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</Login_Register_Layout>
		);
	}
}

export default Login;