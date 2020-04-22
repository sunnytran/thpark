import React from "react";
import Login_Register_Layout from '../components/Login_Register_Layout';

import Router from 'next/router';
import {attemptLogin, logout, isLoggedIn, getRole} from '../components/Auth';

import {url} from '../components/Const';

class Login extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			username: "",
			password: "",
			message: ""
		};

		this.onSubmitLogin = this.onSubmitLogin.bind(this);
		this.onChange = this.onChange.bind(this);
		this.loginMessage = this.loginMessage.bind(this);
	}

	//ComponentDidMount is what the webpage does when its loaded or reloaded
	//IMPORTANT: The frontend does functions out of sync, so not everything
	//may finish in order unless you explicitly make it do so
	async componentDidMount(){
		let test = await isLoggedIn();
		if (test === true){
			Router.push('/');
		}

		console.log(url);
	}

	async componentDidUpdate(){
		let test = await isLoggedIn();
		if (test === true){
			let role = await getRole();
			if (role !== 'none'){
				Router.push('/');
			}
			else {
				await logout();
			}
		}
	}

	async onSubmitLogin(event){
		event.preventDefault();
		this.setState({
			message: "",
		});

		await attemptLogin(this.state.username, this.state.password);

		let test = await isLoggedIn();
		
		if (test === true){
			let role = await getRole();

			if (role !== 'none'){
				Router.push('/');
			}
			else {
				this.setState({
					message: "Your account does not have access!",
				});
				await logout();
			}
		}
		else {
			this.setState({
				message: "Incorrect Username or Password!",
			});
		}
	}

	onChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState(
			{[name]: value},
		);
	}

	loginMessage() {
		if (this.state.message === undefined || this.state.message === "") {return null;}
		return (<label class="has-text-danger">{this.state.message}</label>);
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
										<input class="input" name="username" type="text" value={this.state.username} placeholder="Username" onChange={this.onChange}/>
									</div>
								</div>
								<div className="field">
									<label className="label">Password</label>
									<div className="control">
										<input class="input" name="password" type="password" value={this.state.password} placeholder="********" onChange={this.onChange}/>
									</div>
								</div>

								<div className="field is-grouped">
									<div className="control">
										<input className="button is-link" type="submit" value="Submit" onClick={this.onSubmitLogin}/>
									</div>
								</div>
							</div>
						</form>
						<this.loginMessage/>
					</div>
				</Login_Register_Layout>
		);
	}
}

export default Login;