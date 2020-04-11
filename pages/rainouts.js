import Layout from '../components/Layout';
import Popup from '../components/Popup';
import EventEntry from '../components/EventEntry';
import Moment from 'moment';
import moment from 'moment';

class Rainouts extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			rainouts: [],
			issues: [],
			showEventPop: false,
		}

		this.toggleRainoutPop = this.toggleRainoutPop.bind(this);
		this.reportRainout = this.reportRainout.bind(this);
	}

	componentDidMount(){
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

	toggleRainoutPop() {
		this.setState((prev, props) => {
			const newPop = !prev.showEventPop;

			return { showEventPop: newPop };
		});
	}

	reportRainout() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');
		
		fetch("https://www.tpmanagement.app/api/rainouts", {
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
			.then(res => console.log(res))
			.catch(error => console.log(error));
	
		this.setState({
			rainouts: [ ...this.state.rainouts, data]
		});
		this.toggleRainoutPop();
	}

	render() {
		const rainouts = this.state.rainouts;

		return (
			<Layout>
				<div>
					<button onClick={this.toggleEventPop} class="button is-link is-outlined">
						<span class="icon">
							<i class="fa fa-plus"></i>
						</span>
						<span>Report rainout</span>
					</button>

					<Popup closePopup={this.toggleRainoutPop} showPop={this.state.showRainoutPop} title="Report rainout" submitText="Report rainout" btnFunc={this.reportRainout}>
						<div class="columns">
						</div>
						
						<div class="columns">
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

