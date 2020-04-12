import Login_Register_Layout from '../components/Login_Register_Layout';
import React from "react";
import {attemptLogin, isLoggedIn} from '../components/Auth';

class Login extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			username: "",
			password: ""
		}
	}

	//ComponentDidMount is what the webpage does when its loaded or reloaded
	componentDidMount(){
		attemptLogin("av21", "monster");
	}

	render(){
		return (
				<Login_Register_Layout>
					<div className="container">

						<form action="https://wp.zybooks.com/form-viewer.php" target="_blank" method="POST">
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