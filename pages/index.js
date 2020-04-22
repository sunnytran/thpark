import Layout from '../components/Layout';
import Popup from '../components/Popup';
import Moment from 'moment';
import moment from 'moment';

import Router from 'next/router';
import {attemptLogin, logout, isLoggedIn, getRole} from '../components/Auth';

import {url} from '../components/Const';

class Index extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			role: "none"
		}
	}

	async componentDidMount(){
		let role = await getRole();

		if (role === 'none'){
			await logout();
			Router.push('/login');
		}

		this.setState({
			role: role
		});
	}

	render() {
		return (
			<Layout>
				<div>
					<div class="columns">
						<div class="is-third">
							
							<h1 class="title">Welcome to Theme Park Manager</h1>
							<p class="subtitle">As a {this.state.role} user you have access the following pages</p>
							<div class="card">
							<div class="card-content">
							{this.state.role === "admin" &&
							<table class="table">
								<tr>
									<th>Rides</th>
									<td>Create and edit rides while also keeping track of ongoing issues</td>
								</tr>
									<th>Stores</th>
									<td>Create and edit stores</td>
								<tr>
									<th>Events</th>
									<td>Create and reschedule events</td>
								</tr>
								<tr>
									<th>Rainouts</th>
									<td>Report if there is a rainout</td>
								</tr>
								<tr>
									<th>Scanner</th>
									<td>Scan in riders, ticket sales, shop sales, and event attendees</td>
								</tr>
								<tr>
									<th>Staff</th>
									<td>Add and change passwords of employees</td>
								</tr>
								<tr>
									<th>Reports</th>
									<td>Keep up to date on theme park statistics</td>
								</tr>
							</table>
							}

							{this.state.role === "manager" &&
							<table class="table">
								<tr>
									<th>Rides</th>
									<td>Create and edit rides while also keeping track of ongoing issues</td>
								</tr>
									<th>Stores</th>
									<td>Create and edit stores</td>
								<tr>
									<th>Events</th>
									<td>Create and reschedule events</td>
								</tr>
								<tr>
									<th>Rainouts</th>
									<td>Report if there is a rainout</td>
								</tr>
								<tr>
									<th>Scanner</th>
									<td>Scan in riders, ticket sales, shop sales, and event attendees</td>
								</tr>
								<tr>
									<th>Staff</th>
									<td>Add and change passwords of employees</td>
								</tr>
								<tr>
									<th>Reports</th>
									<td>Keep up to date on theme park statistics</td>
								</tr>
							</table>
							}

							{this.state.role === "basic" &&
							<table class="table">
								<tr>
									<th>Scanner</th>
									<td>Scan in riders, ticket sales, shop sales, and event attendees</td>
								</tr>
							</table>
							}
							</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}

};

export default Index;

