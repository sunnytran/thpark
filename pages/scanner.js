
import Layout from '../components/Layout';

class Scanner extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			operation: "rideson",
			customer: "",

			rides: [],
			ride: null,

			events: [],

			notify: ""
		};

	}

	componentDidMount(){
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

		fetch("https://www.tpmanagement.app/api/events")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					events: result
				});
				console.log(result);
			}
		)
	}

	submitRideson(event){
		/*var customer;
		const ride = this.state.ride;
		if (this.state.customer === ""){

		}*/
	}

	submitSellTicket(event){

	}

	submitMakeSale(event){

	}

	submitAttendEvent(event){

	}

	renderOperation(){
		if (this.state.operation === "rideson"){
			return (
			<div>
				<h2>Scan Rider</h2>
				<select name="ride" onChange={this.onChange}>
					{this.state.rides.map((x,y) => <option key={x.ride_name}>{x.ride_name}</option>)}
				</select>
				<form onSubmit={this.submitRideson}>
					<label>Customer Id: 
						<input type="text" value={this.state.customer}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
			</div>
			);
		}
		else if (this.state.operation === "tickets"){
			return (
				<div>
				<h2>Sell Ticket</h2>
					<form onSubmit={this.submitSellTicket}>
						<label>Customer Id: 
							<input type="text" value={this.state.customer}/>
						</label>
						<input type="submit" value="Submit"/>
					</form>
					</div>
				);}
		else if (this.state.operation === "sales"){
			return (
				<div>
				<h2>Sell Item</h2>
				<form onSubmit={this.submitSellTicket}>
					<label>Customer Id: 
						<input type="text" value={this.state.customer}/>
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
					{this.state.events.map((x,y) => <option key={x.event_name}>{x.event_name}</option>)}
				</select>
				<form onSubmit={this.submitSellTicket}>
					<label>Customer Id: 
						<input type="text" value={this.state.customer}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
				</div>
			);
		}
	}

	addCustomer(){}
	lookupCustomer(){}

	onChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState(
			{[name]: value},
		);
	}

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
					<br/>
				</div>
			</Layout>
		);
	}

};

export default Scanner;

