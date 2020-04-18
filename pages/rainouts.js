import Layout from '../components/Layout';
import Popup from '../components/Popup';
//import EventEntry from '../components/EventEntry';
import Moment from 'moment';
import moment from 'moment';

import Router from 'next/router';
import {attemptLogin, logout, isLoggedIn} from '../components/Auth';

class Rainouts extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			rainouts: [],
			showRainoutPop: false
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

		this.getRainouts();

	}

	toggleRainoutPop() {
		this.setState((prev, props) => {
			const newPop = !prev.showRainoutPop;

			return { showRainoutPop: newPop };
		});
	}

	getRainouts() {
		fetch("https://www.tpmanagement.app/api/rainouts")
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
		headers.append('Origin', 'https://www.tpmanagement.app');
		
		const res = await fetch("https://www.tpmanagement.app/api/rainouts", {
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
						<div class="columns">
							<label class="label">Confirm Rainout Today</label>
						</div>
					</Popup>

					<table class="table">
						<thead>
							<th>Recent Rainouts</th>
						</thead>

						<tbody>
						{
						rainouts.map(i => {
										return (
											<tr>
												<td>{Moment(i.date).format('M/D/YY')}</td>
											</tr>
										);
									})
								}
							</tbody>
					</table>
				</div>
			</Layout>
		)
	}
};

export default Rainouts;

