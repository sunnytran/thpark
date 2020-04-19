import Popup from '../components/Popup';

import Moment from 'moment';
import moment from 'moment';

class IssuesButton extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showPop: false
		}
		
		this.togglePop = this.togglePop.bind(this);
		this.fixIssue = this.fixIssue.bind(this);

		this.inputIssue = React.createRef();
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	async fixIssue(id) {
		const i = this.props.ride;
		var original = i;

		i.ride_status = 'running';
		i.last_inspection = moment();

		/*let data = {
			"target_name": i.ride_name,
			"ride_name": i.ride_name,
			"ride_type": i.ride_type,
			"creation_date": i.creation_date,
			"location": i.location,
			"ride_status": i.ride_status,
			"last_inspection": i.last_inspection,
			"insurance_expiration_date": i.insurance_expiration_date
		};

		fetch("https://www.tpmanagement.app/api/rides", {
			method: 'PUT', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
			body: JSON.stringify(data)
		})
		.then((res) => { console.log(res) })
		.catch(error => console.log(error));*/

		let data = {
			"issue_id": id
		}
		
		await fetch("https://www.tpmanagement.app/api/maintenance", {
			method: 'PUT', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
			body: JSON.stringify(data)
		})
		.then((res) => { console.log(res) })
		.catch(error => console.log(error));

		await this.props.getSetup();
		//this.props.issues
	}

	render() {
		const ride = this.props.ride;
		const reports = this.props.issues;

		return (
			<div>
				<button class="button is-small" onClick={this.togglePop}>
					<span class="icon has-text-primary">
						<i class="fa fa-wrench"></i>
					</span>
				</button>


				<Popup closePopup={this.togglePop} showPop={this.state.showPop} title="Open Issues" submitText="Close" btnFunc={this.togglePop}>
					<div class="field">
						<label class="label">Ride Issues</label>
						<table class="table">
							<thead>
								<th>Issue type</th>
								<th>Date issued</th>
								{/*<th>Resolved by</th> REMOVED FROM DATABASE*/}
								<th>Severity</th>
								<th>Fix issue</th>	
							</thead>
							<tbody>
								{
									reports.filter(i=> {
										{/*if (i.ride_name == ride.ride_name)
											console.log(i.issue_id);
										else
											console.log("NO MATCH " + i.ride_name);*/}

										return i.ride_name === ride.ride_name
									}).map(i => {
										if (i.resolved){
											return null;
										}
										else{
										return (
											<tr class="has-text-danger">
												<td><b>{i.type}</b></td>
												<td>{Moment(i.start_timestamp).format('M/D/YY')}</td>
												{/*<td>{i.resolved_by}</td>*/}
												<td>{i.severity}</td>
												<td>
													<button class="button is-small" onClick={() => this.fixIssue(i.issue_id)}>
														<span class="icon">
															<i class="fa fa-check"></i>
														</span>
													</button>
												</td>
											</tr>);
										}
									})
								}
							</tbody>
						</table>
					</div>
				</Popup>
			</div>
		);
	}
};

export default IssuesButton;