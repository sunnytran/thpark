
import Layout from '../components/Layout';
import Popup from '../components/Popup';
import RideEntry from '../components/RideEntry';
import MaintenanceButton from '../components/MaintenanceButton';
import EditRideButton from '../components/EditRideButton';
import Moment from 'moment';
import moment from 'moment';

import Router from 'next/router';
import {attemptLogin, logout, isLoggedIn} from '../components/Auth';

class Rides extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			rides: [],
			issues: [],
			showRidePop: false,
		}
		
		this.inputRideName   = React.createRef();
		this.inputRideType   = React.createRef();
		this.inputLocation   = React.createRef();
		this.inputStatus	   = React.createRef();
		this.inputBuildDate  = React.createRef();
		this.inputInspection = React.createRef(); 
		this.inputInsurance = React.createRef();

		this.toggleRidePop = this.toggleRidePop.bind(this);
		this.addRide = this.addRide.bind(this);
		this.removeRide = this.removeRide.bind(this);
		this.updateRideStatus = this.updateRideStatus.bind(this);
		this.CompleteButton = this.CompleteButton.bind(this);
		this.completeRide = this.completeRide.bind(this);
	}

	async componentDidMount(){
		let test = await isLoggedIn();
		console.log(test);
		if (test === false){
			Router.push('/login');
		}
		this.getSetup();
	}

	getSetup(){
		fetch("https://www.tpmanagement.app/api/rides")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					rides: result
				});
				console.log(result);
			}
		)

		fetch("https://www.tpmanagement.app/api/maintenance")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					issues: result
				});
				console.log(result);
			}
		)
	}

	toggleRidePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showRidePop;

			return { showRidePop: newPop };
		});
	}

	async addRide() {
		var data = {
			"ride_name": this.inputRideName.current.value,
			"ride_type": this.inputRideType.current.value,
			"creation_date": this.inputBuildDate.current.value,
			"location": this.inputLocation.current.value,
			"ride_status": this.inputStatus.current.value,
			"last_inspection": this.inputInspection.current.value,
			"insurance_expiration_date": this.inputInsurance.current.value
		};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		const res = await fetch("https://www.tpmanagement.app/api/rides", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});

		this.getSetup();
		
		//OLD
		/*fetch("https://www.tpmanagement.app/api/rides", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => console.log(res))
		.catch(error => console.log(error));
	
		this.setState({
			rides: [ ...this.state.rides, data]
		});*/

		this.toggleRidePop();
	}

	async removeRide(i) {

		const res = await fetch("https://www.tpmanagement.app/api/rides", {
			method: 'DELETE', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
     		 body: JSON.stringify({"name": i.ride_name})
    	});

    	this.getSetup();

		//OLD
		/*.then((res) => { console.log(res) })
		.catch(error => console.log(error));

		var index = this.state.rides.indexOf(i);
		var tmp = [...this.state.rides];
		tmp.splice(index, 1);
		this.setState({
			rides: tmp
		})*/
	};

	async completeRide(i) {
		var index = this.state.rides.indexOf(i);

		i.ride_status = 'running';
		i.creation_date = moment();
		i.last_inspection = moment();
		i.insurance_expiration_date = moment().add(2, 'years').calendar()

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

		const res = await fetch("https://www.tpmanagement.app/api/rides", {
			method: 'PUT', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
	      	body: JSON.stringify(data)
	    });

	    this.getSetup();

	    /* OLD
		.then((res) => { console.log(res) })
		.catch(error => console.log(error));

		var tmp = [...this.state.rides];
		tmp[index] = i;
		this.setState({
			rides: tmp
		});*/
	}

	CompleteButton(props) {
		if (props.ride.ride_status != "construction")
			return null;

		return (
			<button class="button is-small" onClick={() => this.completeRide(props.ride)}>
				<span class="icon">
					<i class="fa fa-check"></i>
				</span>
			</button>
		);
	}

	updateRideStatus(i, status, issue) {
		
		var index = this.state.rides.indexOf(i);
		
		i.ride_status = status;
		i.last_inspection = moment().format('M/D/YY')

		var tmp = [...this.state.rides];
		tmp[index] = i;


		if (status == 'maintenance') {
			this.setState({
				issues: [ ...this.state.issues, issue ]
			});
		}

		this.setState({
			state: this.state
		});
		this.setState({
			togglePop: false
		});
	}

	//<input ref={this.inputRideType} class="input" type="text" placeholder="Type" />
	//<input ref={this.inputStatus} class="input" type="text" placeholder="Status" />

	render() {
		const rides = this.state.rides;

		return (
			<Layout>
				<div>
					<button onClick={this.toggleRidePop} class="button is-link is-outlined">
						<span class="icon">
							<i class="fa fa-plus"></i>
						</span>
						<span>Add a ride</span>
					</button>

					<Popup closePopup={this.toggleRidePop} showPop={this.state.showRidePop} title="Add a ride" submitText="Add ride" btnFunc={this.addRide}>
						<div class="columns">
							<div class="column is-half field">
								<label class="label">Ride name</label>
								<div class="control">
									<input ref={this.inputRideName} value={this.state.inputRideName} class="input" type="text" placeholder="Ride name" />
								</div>
							</div>
							<div class="column is-half field">
								<label class="label">Type</label>
								<div class="control">
								<select ref={this.inputRideType} class="input" type="text" placeholder="Type" defaultValue="ferris_wheel">
										<option value="ferris_wheel">Ferris Wheel</option>
										<option value="bumper_cars">Bumper Cars</option>
										<option value="roller_coaster">Roller Coasters</option>
										<option value="carousels">Carousels</option>
										<option value="water">Water</option>
										<option value="swing">Swing</option>
										<option value="slide">Slide</option>
										<option value="pendulum">Pendulum</option>
										<option value="drop_tower">Drop Tower</option>
										<option value="scrambler">Scrambler</option>
										<option value="other">Other</option>
									</select>
								</div>
							</div>
						</div>
						
						<div class="columns">
							<div class="column is-half field">
								<label class="label">Location</label>
								<div class="control">
									<input ref={this.inputLocation} class="input" type="text" placeholder="Location" />
								</div>
							</div>
							<div class="column is-half field">
								<label class="label">Status</label>
								<div class="control">
									<select ref={this.inputStatus} class="input" type="text" placeholder="Type" defaultValue="running">
										<option value="running">Running</option>
										<option value="maintenance">Maintenance</option>
										<option value="construction">Construction</option>
									</select>
								</div>
							</div>
						</div>

						<div class="columns">
							<div class="column is-third field">
								<label class="label">Build date</label>
								<div class="control">
									<input ref={this.inputBuildDate} class="input" type="date" placeholder="Last inspection" />
								</div>
							</div>
							<div class="column is-third field">
								<label class="label">Last inspection</label>
								<div class="control">
									<input ref={this.inputInspection} class="input" type="date" placeholder="Last inspection" />
								</div>
							</div>
							<div class="column is-third field">
								<label class="label">Insurance expiration</label>
								<div class="control">
									<input ref={this.inputInsurance} class="input" type="date" placeholder="Insurance expiration" />
								</div>
							</div>
						</div>
						
					</Popup>

					<table class="table">
						<thead>
							<th>Ride name</th>
							<th>Type</th>
							<th>Build date</th>
							<th>Location</th>
							<th>Status</th>
							<th>Last inspection</th>
							<th>Insurance expiration</th>
							<th>Action</th>
						</thead>

						<tbody>
							{
								rides.map(i => {

									return (
										<tr class={i.ride_status == "maintenance" ? "has-text-danger" : ""}>
											<td><RideEntry issues={this.state.issues} ride={i} updateRideStatus={this.updateRideStatus.bind(this)} /></td>
											<td>{i.ride_type}</td>
											<td>{Moment(i.creation_date).format('M/D/YY')}</td>
											<td>{i.location}</td>
											<td>{i.ride_status}</td>
											<td>{Moment(i.last_inspection).format('M/D/YY')}</td>
											<td>{Moment(i.insurance_expiration_date).format('M/D/YY')}</td>
											<td>
												<div class="buttons">
													<EditRideButton ride={i} getSetup={this.getSetup.bind(this)}/>
													<button class="button is-small" onClick={() => this.removeRide(i)}>
														<span class="icon">
															<i class="fa fa-times"></i>
														</span>
													</button>
													<this.CompleteButton ride={i} />
													<MaintenanceButton ride={i} updateRideStatus={this.updateRideStatus.bind(this)} />
												</div>
											</td>
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

export default Rides;

