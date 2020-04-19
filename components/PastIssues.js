import Popup from '../components/Popup';

import Moment from 'moment';
import moment from 'moment';

class PastIssues extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showPop: false
		}
		
		this.togglePop = this.togglePop.bind(this);
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	render() {
		const ride = this.props.ride;
		const reports = this.props.issues;

		return (
			<div>
				<button class="button is-small" onClick={this.togglePop}>
					<span class="icon has-text-info">
						<i class="fa fa-book"></i>
					</span>
				</button>


				<Popup closePopup={this.togglePop} showPop={this.state.showPop} title="Resolved Issues" submitText="Close" btnFunc={this.togglePop}>
					<div class="field">
						<table class="table">
							<thead>
								<th>Issue type</th>
								<th>Date issued</th>
								<th>Date resolved</th>
								{/*<th>Resolved by</th> REMOVED FROM DATABASE*/}
								<th>Severity</th>
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
										if (!i.resolved){
											return null;
										}
										else{
										return (
											<tr>
												<td><b>{i.type}</b></td>
												<td>{Moment(i.start_timestamp).format('M/D/YY')}</td>
												<td>{Moment(i.end_timestamp).format('M/D/YY')}</td>
												<td>{i.severity}</td>
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

export default PastIssues;