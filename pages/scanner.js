import Layout from '../components/Layout';
import Moment from 'moment';
import moment from 'moment';

import Router from 'next/router';
import {attemptLogin, logout, isLoggedIn} from '../components/Auth';

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
			sale_type: "food",
			sale_item: "",
			sale_amount : 0,

			events: [],
			event: null,
			last10attendees: [],

			notify: "",

			firstNameAdd: "",
			lastNameAdd: "",
			customerIdAdd : "",

			firstNameLookup: "",
			lastNameLookup: "",
			customerIdLookup: ""
		};

		this.submitRideson = this.submitRideson.bind(this);
		this.submitSellTicket = this.submitSellTicket.bind(this);
		this.submitMakeSale = this.submitMakeSale.bind(this);
		this.submitAttendEvent = this.submitAttendEvent.bind(this);

		this.submitAddCustomer = this.submitAddCustomer.bind(this);
		this.submitLookupCustomer = this.submitLookupCustomer.bind(this);
	}

	async componentDidMount(){
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

		fetch("https://www.tpmanagement.app/api/shops")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					shops: result,
					shop: result[0].shop_name
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
		this.getLast10Tickets();
		this.getLast10Sales();
		this.getLast10Attendees();
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
		})
		.catch(error => console.log(error));
	}

	getLast10Tickets(){
		const data = {"type" : "tickets"};

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
				last10tickets: result
			});
		})
		.catch(error => console.log(error));
	}

	getLast10Sales(){
		const data = {"type" : "sales"};

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
				last10sales: result
			});
		})
		.catch(error => console.log(error));
	}

	getLast10Attendees(){
		const data = {"type" : "attends"};

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
				last10attendees: result
			});

			console.log(result);
		})
		.catch(error => console.log(error));
	}

	async submitRideson(event){
		event.preventDefault();

		/*this.setState({
			notify: "Testing"
		});*/

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

		const res = await fetch("https://www.tpmanagement.app/api/rideson", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});

		const result = await res.json();

		this.getLast10Riders();
	}

	async submitSellTicket(event){
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

		const res = await fetch("https://www.tpmanagement.app/api/tickets", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});
		const result = await res.json();

		this.getLast10Tickets();
	}

	async submitMakeSale(event){
		event.preventDefault();

		let customer = this.state.customer;
		const shop = this.state.shop;
		const sale_type = this.state.sale_type
		const sale_item = this.state.sale_item;
		const sale_amount = this.state.sale_amount;

		if (customer === ""){
			customer = null;
		}

		let data = {"sale_item" : sale_item, "sale_amount" : sale_amount, "sale_type" : sale_type, "customer_id" : customer, "sale_from" : shop};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		const res = await fetch("https://www.tpmanagement.app/api/sales", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});
		const result = await res.json();

		this.getLast10Sales();
	}

	async submitAttendEvent(event){
		event.preventDefault();

		let customer = this.state.customer;
		const event_id = this.state.event;
		if (customer === ""){
			customer = null;
		}

		let data = {"event_id" : event_id, "customer_id" : customer};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		const res = await fetch("https://www.tpmanagement.app/api/attends", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});
		const result = await res.json();

		this.getLast10Attendees();
	}

	renderOperation(){
		if (this.state.operation === "rideson"){
			//Notify is important to show our trigger notification!
			return (
			<div>
				<label class="label">Scan Rider</label>					
				<div class="field">
				<div class="control">
				<div class="select">
					<select name="ride" onChange={this.onChange}>
						{this.state.rides.map((x,y) => <option value={x.ride_name}>{x.ride_name}</option>)}
						}
					</select>
				</div>
				</div>
				</div>
				<div class="field">
				<div class="control" >
				<form onSubmit={this.submitRideson}>
						<label class="label">Customer Id: 
							<input type="text" class="input is-small" name="customer" value={this.state.customer} defaultValue="" onChange={this.onChange}/>
						</label>
					<input type="submit" class="button is-primary is-small" value="Submit"/>
				</form>
				</div>
				</div>
				{
					this.state.notify !== "" ? (<p>NOTIFICATION: {this.state.notify}</p>) : null
				}
				<br/>
				<label class="label">Last 10 Riders</label>
				<ul>
					{this.state.last10riders.map((x,y) => <li key={x}>{Moment(x.timestamp).format('YYYY/MM/DD hh:mm:ss')} - Ride: {x.ride_name}</li>)}
				</ul>
			</div>
			);
		}
		else if (this.state.operation === "tickets"){
			return (
				<div>
					<label class="label">Sell Ticket</label>
					<div class="control" >
					<form onSubmit={this.submitSellTicket}>
						<label class="label">Customer Id: 
							<input type="text" class="input is-small" name="customer" value={this.state.customer} defaultValue="" onChange={this.onChange}/>
						</label>
						<input type="submit" class="button is-primary is-small" value="Submit"/>
					</form>
					</div>
					<br/>
					<label class="label">Last 10 Tickets Sold</label>
					<ul>
						{this.state.last10tickets.map((x,y) => <li key={x}>{Moment(x.timestamp).format('YYYY/MM/DD hh:mm:ss')} - Ticket Sale</li>)}
					</ul>
				</div>
				);
		}
		else if (this.state.operation === "sales"){
			return (
				<div>
					<label  class="label">Sell Item</label>

					<div class="field">
					<div class="control">
					<div class="select">
						<select name="sale" onChange={this.onChange}>
							{this.state.shops.map((x,y) => <option value={x.shop_name}>{x.shop_name}</option>)}
						</select>
					</div>
					</div>
					</div>

					<div class="field">
					<div class="control">
					<div class="select">
						<select name="sale_type" onChange={this.onChange}>
							<option value="food">Food</option>
							<option value="gift">Gift</option>
							<option value="game">Game</option>
						</select>
					</div>
					</div>
					</div>

					<div class="control" >
					<form onSubmit={this.submitMakeSale}>
						<label class="label">Sale Item
							<input type="text" class="input is-small" name="sale_item" value={this.state.sale_item} defaultValue="" onChange={this.onChange}/>
						</label>
						<label class="label">Sale Amount
							<input type="text" class="input is-small" name="sale_amount" value={this.state.sale_amount} defaultValue={0} onChange={this.onChange}/>
						</label>
						<label class="label">Customer Id:
							<input type="text" class="input is-small" name="customer" value={this.state.customer} defaultValue="" onChange={this.onChange}/>
						</label>
						<input type="submit" class="button is-primary is-small" value="Submit"/>
					</form>
					</div>
					<br/>
					<label class="label">Last 10 Sales</label>
					<ul>
						{this.state.last10sales.map((x,y) => <li key={x}>{Moment(x.timestamp).format('YYYY/MM/DD hh:mm:ss')} - Sale: {x.sale_item}</li>)}
					</ul>
				</div>
			);
		}
		else if (this.state.operation === "attends"){
			return (
				<div>
					<label class="label">Event Attendee</label>
					<div class="field">
					<div class="control">
					<div class="select">
						<select name="event" onChange={this.onChange}>
							{this.state.events.map((x,y) => <option value={x.event_id}>{x.event_name}</option>)}
						</select>
					</div>
					</div>
					</div>
					<div class="control" >
						<form onSubmit={this.submitAttendEvent}>
							<label class="label">Customer Id: 
								<input type="text" class="input is-small" name="customer" value={this.state.customer} defaultValue="" onChange={this.onChange}/>
							</label>
							<input type="submit" class="button is-primary is-small" value="Submit"/>
						</form>
					</div>
					<br/>
					<label class="label">Last 10 Event Attendees</label>
					<ul>
						{this.state.last10attendees.map((x,y) => <li key={x}>{Moment(x.timestamp).format('YYYY/MM/DD hh:mm:ss')} - Event: {x.event_id}</li>)}
					</ul>
				</div>
			);
		}
	}

	async submitAddCustomer(){
		event.preventDefault();

		const data = {"first_name":this.state.firstNameAdd, "last_name":this.state.lastNameAdd};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		const res = await fetch("https://www.tpmanagement.app/api/customer", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});

		const result = await res.json();

		this.setState({
			customerIdAdd : result
		});
	}

	async submitLookupCustomer(){
		event.preventDefault();

		const data = {"first_name":this.state.firstNameLookup, "last_name":this.state.lastNameLookup};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		const res = await fetch("https://www.tpmanagement.app/api/customer", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'PUT',
			mode: 'cors'
		});

		const result = await res.json();

		this.setState({
			customerIdLookup : result
		});

		console.log(data);

		console.log(result);
	}

	render(){
		const operationElement = this.renderOperation();

		return(
			<Layout>
				<div class="columns">
					<div class="column is-one-third">
					<div class="field">
					<div class="control">
						<label class="label">Scan Operation</label>
						<div class="select">
						<select name="operation" onChange={this.onChange}>
							<option value="rideson">Scan Rider</option>
							<option value="tickets">Sell Tickets</option>
							<option value="sales">Sell Items</option>
							<option value="attends">Check In Attendee</option>
						</select>
					</div>
					</div>
					</div>
						<br/>
						{operationElement}
						<br/>
					</div>

					<div class="column is-one-fifth">
						<label class="label">Add Customer</label>
						<form onSubmit={this.submitAddCustomer}>
							<label class="label">First Name: 
								<input type="text" class="input is-small" name="firstNameAdd" value={this.state.firstNameAdd} defaultValue="" onChange={this.onChange}/>
							</label>
							<label class="label">Last Name: 
								<input type="text" class="input is-small" name="lastNameAdd" value={this.state.lastNameAdd} defaultValue="" onChange={this.onChange}/>
							</label>
							<input type="submit" class="button is-primary is-small" value="Submit"/>
						</form>
						{
							this.state.customerIdAdd !== "" ? (<p>New Customer Id: {this.state.customerIdAdd}</p>) : null
						}
						<br/>
						<label class="label">Lookup Customer</label>
						<form onSubmit={this.submitLookupCustomer}>
							<label class="label">First Name: 
								<input type="text" class="input is-small" name="firstNameLookup" value={this.state.firstNameLookup} defaultValue="" onChange={this.onChange}/>
							</label>
							<label class="label">Last Name: 
								<input type="text" class="input is-small" name="lastNameLookup" value={this.state.lastNameLookup} defaultValue="" onChange={this.onChange}/>
							</label>
							<input type="submit" class="button is-primary is-small" value="Submit"/>
						</form>
						{
							this.state.customerIdLookup !== "" ? (<div><p>Customer Id Search: </p><ul>{this.state.customerIdLookup.map((x,y) => <li key={x}>{x.first_name} {x.last_name} {x.customer_id}</li>)}</ul></div>) : null
						}
						<br/>
					</div>
				</div>
			</Layout>
		);
	}
};

export default Scanner;

