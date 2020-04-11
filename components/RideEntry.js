
import Popup from './Popup';
import Report from './Report';
import Moment from 'moment';
import moment from 'moment';

class RideEntry extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			//reports: [],
			showPop: false
		}
		this.togglePop = this.togglePop.bind(this);
		this.fixIssue = this.fixIssue.bind(this);
	}

	//componentDidMount(){
		//fetch("https://www.tpmanagement.app/api/maintenance")
		//.then(res => res.json())
		//.then (
			//(result)=> {
				//this.setState({
					//reports: result
				//});
				//console.log(result);
			//}
		//)
	//}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	fixIssue(id) {
		const i = this.props.ride;
		var original = i;

		i.ride_status = 'running';
		i.last_inspection = moment();

		var data = {
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
		.catch(error => console.log(error));

		var data = {
			"issue_id": id
		}
		
		fetch("https://www.tpmanagement.app/api/maintenance", {
			method: 'PUT', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
			body: JSON.stringify(data)
		})
		.then((res) => { console.log(res) })
		.catch(error => console.log(error));

		this.props.updateRideStatus(original, "running", null);
	}

	render() {

		const ride = this.props.ride;
		const reports = this.props.issues;

		if (ride.ride_status == "maintenance") {
			return (
				<div>
					<a href="#" class="has-text-danger" onClick={this.togglePop}>
						<b>{ride.ride_name}</b>
					</a>

					<Popup submitText="OK" closePopup={this.togglePop} showPop={this.state.showPop} title={"Report for " + ride.ride_name} btnFunc={this.togglePop}>


						<table class="table">
							<thead>
								<th>Issue type</th>
								<th>Date issued</th>
								<th>Date resolved</th>
								<th>Resolved by</th>
								<th>Severity</th>
								<th>Fix issue</th>	
							</thead>

							<tbody>
								{
									reports.filter(i=> {
										if (i.ride_name == ride.ride_name)
											console.log(i.issue_id);
										else
											console.log("NO MATCH " + i.ride_name);

										return i.ride_name == ride.ride_name
									}).map(i => {

										return (

											<tr class={!i.resolved ? "has-text-danger" : ""}>
												<td><b>{i.type}</b></td>
												<td>{Moment(i.start_timestamp).format('M/D/YY')}</td>
												<td>{Moment(i.end_timestamp).format('M/D/YY')}</td>
												<td>{i.resolved_by}</td>
												<td>{i.severity}</td>
												<td>
													<button class="button is-small" onClick={() => this.fixIssue(i.issue_id)}>
														<span class="icon">
															<i class="fa fa-check"></i>
														</span>
													</button>
												</td>
											</tr>
										);
									})
								}
							</tbody>
						</table>

					</Popup>
				</div>
			);
		}

		return (
			<b>{ride.ride_name}</b>
		);
	}
}

export default RideEntry;

