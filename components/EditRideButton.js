import Popup from '../components/Popup';

class EditRideButton extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showPop: false
		}
		
		this.togglePop = this.togglePop.bind(this);
		this.edit = this.edit.bind(this);

		this.inputRideName   = React.createRef();
		this.inputLocation   = React.createRef();
		this.inputStatus	   = React.createRef();
		this.inputInspection = React.createRef(); 
		this.inputInsurance = React.createRef();
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	async edit() {
		const i = this.props.ride;

		let inspection = i.last_inspection;
		let insurance = i.insurance_expiration_date;

		if (this.inputInspection.current.value){
			inspection = this.inputInspection.current.value;
		}

		if (this.inputInsurance.current.value){
			insurance = this.inputInsurance.current.value;
		}

		console.log("TESTING: " + this.inputInsurance.current.value);

		var data = {
			"target_name": i.ride_name,
			"ride_name": this.inputRideName.current.value,
			"ride_type": i.ride_type,
			"location": this.inputLocation.current.value,
			"ride_status": this.inputStatus.current.value,
			"creation_date": i.creation_date,
			"last_inspection": inspection,
			"insurance_expiration_date": insurance
		};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		const res = await fetch("https://www.tpmanagement.app/api/rides", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'PUT',
			mode: 'cors'
		});

		this.togglePop();
		this.props.getSetup();
	}

	render() {
		const ride = this.props.ride;

		return (
			<div>
				<button class="button is-small" onClick={this.togglePop}>
					<span class="icon has-text-info">
						<i class="fa fa-edit"></i>
					</span>
				</button>


				<Popup closePopup={this.togglePop} showPop={this.state.showPop} title="Edit Ride" submitText="Change" btnFunc={this.edit}>
					<div class="columns">
							<div class="column is-half field">
								<label class="label">Ride name</label>
								<div class="control">
									<input ref={this.inputRideName} value={this.state.inputRideName} class="input" type="text" defaultValue={ride.ride_name} />
								</div>
							</div>
						</div>
						
						<div class="columns">
							<div class="column is-half field">
								<label class="label">Location</label>
								<div class="control">
									<input ref={this.inputLocation} class="input" type="text" defaultValue={ride.location} />
								</div>
							</div>
							<div class="column is-half field">
								<label class="label">Status</label>
								<div class="control">
									<select ref={this.inputStatus} class="input" type="text" placeholder="Type" defaultValue={ride.ride_status}>
										<option value="running">Running</option>
										<option value="maintenance">Maintenance</option>
										<option value="construction">Construction</option>
									</select>
								</div>
							</div>
						</div>

						<div class="columns">
							<div class="column is-half field">
								<label class="label">Last inspection</label>
								<div class="control">
									<input ref={this.inputInspection} class="input" type="date" defaultValue={ride.ride_inspection} />
								</div>
							</div>
							<div class="column is-half field">
								<label class="label">Insurance expiration</label>
								<div class="control">
									<input ref={this.inputInsurance} class="input" type="date" defaultValue={ride.insurance_expiration_date} />
								</div>
							</div>
						</div>
				</Popup>
			</div>
		);
	}
};

export default EditRideButton;