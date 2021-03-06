import Layout from '../components/Layout';
import Popup from '../components/Popup';
//import EventEntry from '../components/EventEntry';
import Moment from 'moment';
import moment from 'moment';

import Chartkick from 'chartkick'
import { LineChart, BarChart } from 'react-chartkick'
import 'chart.js'

import Router from 'next/router';
import {attemptLogin, logout, isLoggedIn, getRole} from '../components/Auth';

import {url} from '../components/Const';

class Rainouts extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			rainouts: [],
			rainoutscount: [],
			showRainoutPop: false,
			monthly_rainouts: [],
		}

		this.toggleRainoutPop = this.toggleRainoutPop.bind(this);
		this.reportRainout = this.reportRainout.bind(this);
	}

	async componentDidMount(){
		/*await fetch("https://www.tpmanagement.app/api/reports", {
			body: JSON.stringify({ "report" : "rainouts_old", "start" : "2000-1-1", "end": today  }),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					rainouts: result[0]
				});
				//console.log(JSON.stringify(result) +"<--rainouts");
			}
		)
		.catch(error => console.log(error));*/
		let role = await getRole();
		if (role !== 'admin' && role !== 'manager'){
			Router.push('/');
		}

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', url);

		await fetch(url + "/api/reports", {
			body: JSON.stringify({"report" : "rainouts","months": 12}),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => res.json())
		.then (
		(result)=> {
			this.setState({
			monthly_rainouts: result[0].counts
			});
		}
		)
		.catch(error => console.log(error));
		let monthly_rainouts = {};
		await this.state.monthly_rainouts.map((i)=>monthly_rainouts[i.months_ago]=i.count)

		await this.setState({
			monthly_rainouts:monthly_rainouts
		});

		await fetch(url + "/api/reports", {
			body: JSON.stringify({ "report" : "rainouts_old", "start" : moment().subtract(30, 'days').calendar(), "end": moment().calendar() }), headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					rainoutscount: result[0]
				});
			}
		)
		.catch(error => console.log(error));


		this.getRainouts();

	}

	toggleRainoutPop() {
		this.setState((prev, props) => {
			const newPop = !prev.showRainoutPop;

			return { showRainoutPop: newPop };
		});
	}

	getRainouts() {
		fetch(url + "/api/rainouts")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					rainouts: result
				});
				console.log(result);
			}
		)
	}

	async reportRainout() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', url);
		
		const res = await fetch(url + "/api/rainouts", {
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});

		console.log(res);
	
		/*await this.setState({
			rainouts: [ ...this.state.rainouts, data]
		});*/

		this.getRainouts();
		this.toggleRainoutPop();
	}

	

	render() {
		const rainouts = this.state.rainouts;

		return (
			<Layout>
				<div>
					<button onClick={this.toggleRainoutPop} class="button is-link is-outlined">
						<span class="icon">
							<i class="fa fa-plus"></i>
						</span>
						<span>Report rainout</span>
					</button>

					<Popup closePopup={this.toggleRainoutPop} showPop={this.state.showRainoutPop} title="Report rainout" submitText="Report rainout" btnFunc={this.reportRainout}>
						<columns>
						<div class="columns">
							<div class="column is-third">
							<div class="has-text-centered">
							<br/>
							<label class="title is-4">Confirm Rainout Today</label>
							<br/>
							</div>
							</div>
						</div>
						</columns>
					</Popup>

					<div class= "columns">
						<div class = "column is-2">
						<table class="table">
							<thead>
								<th>Recent Rainouts</th>
								{/*<th>Start Time</th>
								<th>End Time</th>*/}
							</thead>

							<tbody>
							{
							rainouts.map(i => {
											return (
												<tr>
													<td><b>{Moment(i.date).format('M/D/YY')}</b></td>
													{/*<td>{Moment(i.start_timestamp).format('h:mm') !== "Invalid date" ? Moment(i.start_timestamp).format('h:mm') : "Unknown"}</td>
													<td>{Moment(i.end_timestamp).format('h:mm') !== "Invalid date" ? Moment(i.end_timestamp).format('h:mm') : "Unknown"}</td>*/}
												</tr>
											);
										})
									}
								</tbody>
						</table>
						</div>

						<div class = "column is-2">
						<div class="card">
							<div class="card-content">
								<p class="title">
									{this.state.rainoutscount["count"]}
								</p>
								<p class="subtitle">
									Rainouts the last 30 days
								</p>
							</div>
						</div>
						</div>
						<div class="column is-third">
						<div class="card">
							<div class="card-content">
								<label class="label">Monthly Rainout Occurences</label>
								<LineChart xtitle = "Months Ago" ytitle = "Number of Rainouts" data = {this.state.monthly_rainouts} />
							</div>
						</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
};

export default Rainouts;
