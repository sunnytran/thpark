
import Popup from './Popup';
import Report from './Report';
import Moment from 'moment';

class RideEntry extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			reports: [],
			showPop: false
		}
		this.togglePop = this.togglePop.bind(this);
	}

	componentDidMount(){
		fetch("https://www.tpmanagement.app/api/maintenance")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					reports: result
				});
				console.log(result);
			}
		)
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	render() {

		const ride = this.props.ride;
		const reports = this.state.reports;

		if (ride.ride_status == "maintenance") {
			return (
				<div>
					<a href="#" class="has-text-danger" onClick={this.togglePop}>
						<b>{ride.ride_name}</b>
					</a>

					<Popup submitText="OK" closePopup={this.togglePop} showPop={this.state.showPop} title={"Report for " + ride.ride_name}>


						<table class="table">
							<thead>
								<th>Issue type</th>
								<th>Date issued</th>
								<th>Date resolved</th>
								<th>Resolved by</th>
								<th>Severity</th>
							</thead>

							<tbody>
								{
									reports.filter(i=> {
										return i.ride_name == ride.ride_name
									}).map(i => {

										return (

											<tr class={!i.resolved ? "has-text-danger" : ""}>
												<td><b>{i.type}</b></td>
												<td>{Moment(i.start_timestamp).format('M/D/YY')}</td>
												<td>{Moment(i.end_timestamp).format('M/D/YY')}</td>
												<td>{i.resolved_by}</td>
												<td>{i.severity}</td>
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

