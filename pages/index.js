import Layout from '../components/Layout';
import Popup from '../components/Popup';
import Moment from 'moment';
import moment from 'moment';

import Router from 'next/router';
import {attemptLogin, logout, isLoggedIn, getRole} from '../components/Auth';

class Index extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			role: "none"
		}
	}

	async componentDidMount(){
		let role = await getRole();

		this.setState({
			role: role
		});
	}

	render() {
		return (
			<Layout>
				<div>
					<h1>Welcome to Theme Park Manager</h1>
					<p>As a {this.state.role} user you have access these pages:</p>
				</div>
			</Layout>
		)
	}

};

export default Index;

