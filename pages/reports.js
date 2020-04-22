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

import {url} from '../components/Const';

class Reports extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			visitors: [],
			ridesOn: [],
			rideIssue: [],
			vAvg: [],
			startDate: "2010-1-1",
			endDate: "2020-12-31",
			startDate2: "2010-1-1",
			endDate2: "2020-12-31",
			pickerValue: [],
		}

		this.inputVisitorDays = React.createRef();

		this.handleDatePick = this.handleDatePick.bind(this);
		this.handleDatePick2 = this.handleDatePick2.bind(this);
		this.makeVisitorReport = this.makeVisitorReport.bind(this);
		this.makeRidesReport = this.makeRidesReport.bind(this);
		this.makeIssuesReport = this.makeIssuesReport.bind(this);
	}

	async componentDidMount(){
		/*let test = await isLoggedIn();
		console.log(test);
		if (test === false){
			Router.push('/login');
		}*/

		let role = await getRole();
		if (role !== 'admin' && role !== 'manager'){
			Router.push('/');
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', url);
		
		/*var earliest = this.state.startDate;
		var today = this.state.endDate;
		var gap = moment(today).diff(moment(earliest), 'days');
		console.log(earliest +" " + today + " |||");
		console.log(gap + "<-- this gap");*/

		await fetch(url + "/api/reports", {
			body: JSON.stringify({"report" : "visitors", "days" : 30}),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					visitors: result[0],
					vAvg: result[1]
				});
			}
		)
		.catch(error => console.log(error));

		await fetch(url + "/api/reports", {
			body: JSON.stringify({ "report" : "rides_on", "start" : "2000-12-31", "end": "2020-12-31"}),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					ridesOn: result
				});
			}
		)
		.catch(error => console.log(error));

		await fetch(url + "/api/reports", {
			body: JSON.stringify({ "report" : "ride_issue", "start" : "2000-12-31", "end": "2020-12-31" }), headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					rideIssue: result
				});
			}
		)
		.catch(error => console.log(error));

		console.log(this.state.rainouts);

		let visitors = {};
		await this.state.visitors.map((i) => visitors[i.date] = i.visitor_count);
		
		let ridesOn = {};
		await this.state.ridesOn.map((i) => ridesOn[i.ride_name] = i.ride_count);

		let rideIssue = {};
		await this.state.rideIssue.map((i) => rideIssue[i.ride_name] = i.ride_issues);

		await this.setState({
			visitors: visitors,
			ridesOn: ridesOn,
			rideIssue: rideIssue
		});
	}

	async handleDatePick(event) {
		let start = event[0];
		let stop = event[1];

		await this.setState({ startDate: moment(start).format('YYYY-M-D'), endDate: moment(stop).format('YYYY-M-D') });
		this.makeRidesReport();
	}

	async handleDatePick2(event) {
		let start = event[0];
		let stop = event[1];

		await this.setState({ startDate2: moment(start).format('YYYY-M-D'), endDate2: moment(stop).format('YYYY-M-D') });
		this.makeIssuesReport();
	}

	async makeVisitorReport(){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', url);
		
		const data = { "report" : "visitors", "days" : parseInt(this.inputVisitorDays.current.value)  };

		const res = await fetch(url + "/api/reports", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});

		const result = await res.json();

		await this.setState({
			visitors: result[0],
			vAvg: result[1]
		});

		let visitors = {};
		await this.state.visitors.map((i) => visitors[i.date] = i.visitor_count);

		await this.setState({
			visitors: visitors,
		});
	}

	async makeRidesReport(){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', url);
		
		const data = {"report" : "rides_on", "start" : this.state.startDate, "end" : this.state.endDate};
		console.log("DATES: " + this.state.startDate + " : " + this.state.endDate);

		const res = await fetch(url + "/api/reports", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});

		const result = await res.json();

		await this.setState({
			ridesOn: result,
		});

		let ridesOn = {};
		await this.state.ridesOn.map((i) => ridesOn[i.ride_name] = i.ride_count);

		await this.setState({
			ridesOn: ridesOn,
		});
	}

	async makeIssuesReport(){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', url);
		
		const data = {"report" : "ride_issue", "start" : this.state.startDate2, "end" : this.state.endDate2};

		const res = await fetch(url + "/api/reports", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});

		const result = await res.json();

		await this.setState({
			rideIssue: result,
		});

		let rideIssue = {};
		await this.state.rideIssue.map((i) => rideIssue[i.ride_name] = i.ride_issues);

		await this.setState({
			rideIssue: rideIssue,
		});
	}

	render() {
		//Old Code
		/*var visitors = {};
		this.state.visitors.map((i) => visitors[i.date] = visitors[i.visitor_count]); //ERROR

		var ridesOn = {};
		this.state.ridesOn.map((i) => ridesOn[i.ride_name] = i.ride_count);

		var rideIssue = {};
		this.state.rideIssue.map((i) => rideIssue[i.ride_name] = i.ride_issues);
		rideIssue = this.state.rideIssue;

		var visitorsAvg = parseInt(this.state.vAvg["average"]);
		var rainoutCount = this.state.rainouts["count"];*/

		//const loaded = this.state.loaded;

		/*if (loaded === false){
			return null;
		}*/

		Chartkick.options = {
			library: {animation: {easing: 'easeOutQuart'}}
		}

		return (
			<Layout>
				<div class="columns">
					<div class="column is-third">
						<div class="card">
							<div class="card-content">
								<label class="label">Daily Visitors</label>
								<LineChart xtitle="Date" ytitle="Visitor Count" data={ this.state.visitors } />
								<div class="has-text-centered">
								<br/>
								<div class="control">
								<div class="field">
									<label>
									<span class= "tag is-white is-medium" for="report_days" >Number of Days</span>
									<input ref={this.inputVisitorDays} type="text is-primary is-normal" defaultValue="30"/>
									<button name="report_days" type="submit" class="button is-primary is-small" onClick={this.makeVisitorReport}>Make Report</button>
									</label>
								</div>
								</div>
								</div>
							</div>
						</div>
					</div>
					<div class="column is-third">
						<div class="card">
							<div class="card-content">
								<p class="title">
									{this.state.startDate} - {this.state.endDate}
								</p>
								<p class="subtitle">
									<DateRangePicker onOk={this.handleDatePick} />
								</p>
								<label class="label">Rides Popularity</label>
								<BarChart xtitle="Riders Count" ytitle="Ride" data={ this.state.ridesOn } />
							</div>
						</div>
					</div>
					<div class="column is-third">
						<div class="card">
							<div class="card-content">
								<p class="title">
									{this.state.startDate2} - {this.state.endDate2}
								</p>
								<p class="subtitle">
									<DateRangePicker onOk={this.handleDatePick2} />
								</p>
								<label class="label">Issues Reported</label>
								<BarChart xtitle="Issue Count" ytitle="Ride" data={ this.state.rideIssue } />
							</div>
						</div>
					</div>
				</div>

				<div class="columns">
					<div class="column is-2">
						<div class="card">
							<div class="card-content">
								<p class="title">
									{parseFloat(this.state.vAvg["average"]).toFixed(2)}
								</p>
								<p class="subtitle">
									Average
								</p>
							</div>
						</div>
					</div>


					<div class="column is-2">
						<div class="card">
							<div class="card-content">
								{/*<p class="title">
									{this.state.rainouts["count"]}
								</p>
								<p class="subtitle">
									Rainouts
								</p>*/}
								<p class="title">
									{parseFloat(this.state.vAvg["median"]).toFixed(0)}
								</p>
								<p class="subtitle">
									Median
								</p>
							</div>
						</div>
					</div>

					
					<div class="column is-4">
						<div class="card">
							<div class="card-content">
							</div>
						</div>
					</div>

					<div class="column is-4">
						<div class="card">
							<div class="card-content">
							</div>
						</div>
					</div>
				</div>
				<div class="columns">
					<div class="column is-2">
						<div class="card">
							<div class="card-content">
								<p class="title">
									{parseFloat(this.state.vAvg["min"]).toFixed(0)}
								</p>
								<p class="subtitle">
									Lowest
								</p>
							</div>
						</div>
					</div>


					<div class="column is-2">
						<div class="card">
							<div class="card-content">
								<p class="title">
									{parseFloat(this.state.vAvg["max"]).toFixed(0)}
								</p>
								<p class="subtitle">
									Highest
								</p>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}

};

export default Reports;



