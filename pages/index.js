import Layout from '../components/Layout';
import Popup from '../components/Popup';
import Moment from 'moment';
import moment from 'moment';

import { DateRangePicker } from 'rsuite';

import Chartkick from 'chartkick'
import { LineChart, BarChart } from 'react-chartkick'
import 'chart.js'

import Router from 'next/router';
import {attemptLogin, logout, isLoggedIn, getRole} from '../components/Auth';

class Index extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	async componentDidMount(){
		/*let test = await isLoggedIn();
		console.log(test);
		if (test === false){
			Router.push('/login');
		}*/

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');
		
		/*var earliest = this.state.startDate;
		var today = this.state.endDate;
		var gap = moment(today).diff(moment(earliest), 'days');
		console.log(earliest +" " + today + " |||");
		console.log(gap + "<-- this gap");*/
	}

	render() {
		return (
			<Layout>
				<div>
					
				</div>
			</Layout>
		)
	}

};

export default Index;

