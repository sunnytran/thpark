
import Layout from '../components/Layout';

class Scanner extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			operation: "rideson",
			customer: "",

			rides: [],
			ride: null,
			last10riders: [],

			last10tickets: [],

			shops: [],
			shop: null,
			last10sales: [],

			events: [],
			event: null,
			last10attendees: [],

			notify: ""
		};

		this.submitRideson = this.submitRideson.bind(this);
		this.submitSellTicket = this.submitSellTicket.bind(this);
		this.submitMakeSale = this.submitMakeSale.bind(this);
		this.submitAttendEvent = this.submitAttendEvent.bind(this);

		//this.getLast10Riders = this.getLast10Riders.bind(this);
	}

	componentDidMount(){
		fetch("https://www.tpmanagement.app/api/rides")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					rides: result,
					ride: result[0].ride_name
				});
				
			}
		)

		fetch("https://www.tpmanagement.app/api/events")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					events: result,
					event: result[0]
				});
				console.log(result);
			}
		)

		this.getLast10Riders();
	}

	onChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState(
			{[name]: value},
		);
	}

	getLast10Riders(){
		const data = {"type" : "rideson"};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		fetch("https://www.tpmanagement.app/api/scanner", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => res.json())
		.then (
			(result)=> {
			this.setState({
				last10riders: result
			});
			console.log(result);
		})
		.catch(error => console.log(error));
	}

	submitRideson(event){
		event.preventDefault();
		let customer = this.state.customer;
		const ride = this.state.ride;
		if (customer === ""){
			customer = null;
		}

		let data = {"ride_name" : ride, "customer_id" : customer};
		console.log("RIDE" + ride);

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		fetch("https://www.tpmanagement.app/api/rideson", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => console.log(res))
		.then (
			(result)=> {
				this.setState({
					events: result,
					event: result[0]
				});
				console.log(result);
			}
		)
		.catch(error => console.log(error));
		this.getLast10Riders();
	}

	submitSellTicket(event){
		event.preventDefault();
		let customer = this.state.customer;
		if (customer === ""){
			customer = null;
		}

		let data = {"customer_id" : customer};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		fetch("https://www.tpmanagement.app/api/tickets", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => console.log(res))
		.catch(error => console.log(error));
	}

	submitMakeSale(event){
		event.preventDefault();

		let customer = this.state.customer;

		if (customer === ""){
			customer = null;
		}
	}

	submitAttendEvent(event){
		event.preventDefault();

		event.preventDefault();
		let customer = this.state.customer;
		const event_id = this.state.event.event_id;
		if (customer === ""){
			customer = null;
		}

		let data = {"event_id" : event_id, "customer_id" : customer};
		console.log("EVENT" + event);

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		fetch("https://www.tpmanagement.app/api/attends", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => console.log(res))
		.catch(error => console.log(error));

	}

	renderOperation(){
		if (this.state.operation === "rideson"){
			return (
			<div>
				<h2>Scan Rider</h2>
				<select name="ride" onChange={this.onChange}>
					{this.state.rides.map((x,y) => <option key={x.ride_name}>{x.ride_name}</option>)}
					}
				</select>
				<form onSubmit={this.submitRideson}>
					<label>Customer Id: 
						<input type="text" name="customer" value={this.state.customer} defaultValue="" onChange={this.onChange}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
				<h2>Rider History</h2>
				<ul>
					{this.state.last10riders.map((x,y) => <li key={x}>{x.ride_name} {x.customer_id} {x.timestamp}</li>)}
				</ul>
			</div>
			);
		}
		else if (this.state.operation === "tickets"){
			return (
				<div>
				<h2>Sell Ticket</h2>
					<form onSubmit={this.submitSellTicket}>
						<label>Customer Id: 
							<input type="text" name="customer" value={this.state.customer} defaultValue="" onChange={this.onChange}/>
						</label>
						<input type="submit" value="Submit"/>
					</form>
					</div>
				);}
		else if (this.state.operation === "sales"){
			return (
				<div>
				<h2>Sell Item</h2>
				<form onSubmit={this.submitMakeSale}>
					<label>Customer Id: 
						<input type="text" name="customer" value={this.state.customer} defaultValue="" onChange={this.onChange}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
				</div>
			);
		}
		else if (this.state.operation === "attends"){
			return (
				<div>
				<h2>Event Attendee</h2>
				<select name="ride" onChange={this.onChange}>
					{this.state.events.map((x,y) => <option key={x}>{x.event_name}</option>)}
				</select>
				<form onSubmit={this.submitAttendEvent}>
					<label>Customer Id: 
						<input type="text" name="customer" value={this.state.customer} defaultValue="" onChange={this.onChange}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
				</div>
			);
		}
	}

	addCustomer(){}
	lookupCustomer(){}

	render(){
		const operationElement = this.renderOperation();

		return(
			<Layout>
				<div>
					<h1>Scanner</h1>
				</div>

				<div>
					<h2>Set Scanning Operation</h2>
					<select name="operation" onChange={this.onChange}>
						<option value="rideson">Ride Check</option>
						<option value="tickets">Sell Tickets</option>
						<option value="sales">Sell Items</option>
						<option value="attends">Check In Attendee</option>
					</select>
					
				</div>
				<div>
					<br/>
					{operationElement}
					<br/>
				</div>

				<div>
					<h2>Add Customer</h2>
					<br/>
				</div>
				<div>
					<h2>Lookup Customer</h2>
					<form onSubmit={this.submitSellTicket}>
						<label>First Name: 
							<input type="text" name="customer" value={this.state.customer} defaultValue="" /*onChange={this.onChange}*//>
						</label>
						<label>Last Name: 
							<input type="text" name="customer" value={this.state.customer} defaultValue="" /*onChange={this.onChange}*//>
						</label>
						<input type="submit" value="Submit"/>
					</form>
					<br/>
				</div>
			</Layout>
		);
	}

};

export default Scanner;

