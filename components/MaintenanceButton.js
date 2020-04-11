
import Popup from '../components/Popup';
import Moment from 'moment';
import moment from 'moment';

class MaintenanceButton extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showPop: false
		}
		
		this.togglePop = this.togglePop.bind(this);
		this.reportIssue = this.reportIssue.bind(this);

		this.inputIssueType = React.createRef();
		this.inputSeverity = React.createRef();
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	reportIssue() {
		const i = this.props.ride;
		var original = i;

		i.ride_status = 'maintenance';
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

		data = {
			"type": this.inputIssueType.current.value,
			"severity": this.inputSeverity.current.value,
			"ride_name": i.ride_name
		}
	
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');
		
		fetch("https://www.tpmanagement.app/api/maintenance", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
			.then(res => console.log(res))
			.catch(error => console.log(error));

		this.togglePop();
	
		this.props.updateRideStatus(original, "maintenance", data);
	}


	render() {
		if (this.props.ride.ride_status != "running")
			return null;

		return (
			<div>
				<button class="button is-small" onClick={this.togglePop}>
					<span class="icon">
						<i class="fa fa-exclamation-triangle"></i>
					</span>
				</button>


				<Popup closePopup={this.togglePop} showPop={this.state.showPop} title="Report an issue" submitText="Report" btnFunc={this.reportIssue}>
					<div class="field">
						<label class="label">Issue type</label>
						<div class="control">
							<input ref={this.inputIssueType} class="input" type="text" placeholder="Issue type" />
						</div>
					</div>

					<div class="field">
						<label class="label">Severity</label>
						<div class="control">
							<input ref={this.inputSeverity} class="input" type="text" placeholder="Severity" />
						</div>
					</div>
				</Popup>
			</div>
		);
	}
};

export default MaintenanceButton;
