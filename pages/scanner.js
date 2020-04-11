
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
			sale_type: "food",
			sale_item: "",
			"sale_amount" : 0,

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
		})
		.catch(error => console.log(error));
	}

	getLast10Attendees(){
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

	submitRideson(event){
		event.preventDefault();

		this.setState({
			notify: "Testing"
		});

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
		.then (
			(result)=> {
				
			}
		)
		.catch(error => console.log(error));
		this.getLast10Tickets();
	}

	submitMakeSale(event){
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

		fetch("https://www.tpmanagement.app/api/sales", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => console.log(res))
		.then (
			(result)=> {
				
			}
		)
		.catch(error => console.log(error));
		this.getLast10Sales();
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
		.then(res => console.log(res)
		)
		.then (
			(result)=> {
				
			}
		)
		.catch(error => console.log(error));
		this.getLast10Attendees();
	}

	renderOperation(){
		if (this.state.operation === "rideson"){
			//Notify is important to show our trigger notification!
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
				{
					this.state.notify !== "" ? (<p>NOTIFICATION: {this.state.notify}</p>) : null
				}
				<br/>
				<h2>Rider History</h2>
				<ul>
					{this.state.last10riders.map((x,y) => <li key={x}>Ride: {x.ride_name} Time: {x.timestamp}</li>)}
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
					<br/>
					<h2>Tickets History</h2>
					<ul>
						{this.state.last10tickets.map((x,y) => <li key={x}>Ticket Sale Time: {x.timestamp}</li>)}
					</ul>
				</div>
				);
		}
		else if (this.state.operation === "sales"){
			return (
				<div>
					<h2>Sell Item</h2>
					<select name="ride" onChange={this.onChange}>
						{this.state.shops.map((x,y) => <option key={x.shop_name}>{x.shop_name}</option>)}
					</select>
					<select name="sale_type" onChange={this.onChange}>
						<option value="food">Food</option>
						<option value="gift">Gift</option>
						<option value="game">Game</option>
					</select>
					<form onSubmit={this.submitMakeSale}>
						<label>Sale Item
							<input type="text" name="sale_item" value={this.state.sale_item} defaultValue="" onChange={this.onChange}/>
						</label>
						<label>Sale Amount
							<input type="number" name="sale_amount" value={this.state.sale_amount} defaultValue={0} onChange={this.onChange}/>
						</label>
						<label>Customer Id:
							<input type="text" name="customer" value={this.state.customer} defaultValue="" onChange={this.onChange}/>
						</label>
						<input type="submit" value="Submit"/>
					</form>
					<br/>
					<h2>Sales History</h2>
					<ul>
						{this.state.last10sales.map((x,y) => <li key={x}>Sale: {x.sale_item} Time: {x.timestamp}</li>)}
					</ul>
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
					<br/>
					<h2>Attendee History</h2>
					<ul>
						{this.state.last10attendees.map((x,y) => <li key={x}>Event: {x.event_name} Time: {x.timestamp}</li>)}
					</ul>
				</div>
			);
		}
	}

	submitAddCustomer(){
		event.preventDefault();

		const data = {"first_name":this.state.firstNameAdd, "last_name":this.state.lastNameAdd};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		fetch("https://www.tpmanagement.app/api/customer", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
		.then(res => console.log(res)
		)
		.then (
			(result)=> {
				this.setState({
					customerIdAdd : ""
				});
			}
		)
		.catch(error => console.log(error));
	}
	submitLookupCustomer(){
		event.preventDefault();

		const data = {"first_name":this.state.firstNameAdd, "last_name":this.state.lastNameAdd};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		fetch("https://www.tpmanagement.app/api/customer", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'PUT',
			mode: 'cors'
		})
		.then(res => console.log(res)
		)
		.then (
			(result)=> {
				this.setState({
					customerIdLookup : result
				});
			}
		)
		.catch(error => console.log(error));
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
					<form onSubmit={this.submitAddCustomer}>
						<label>First Name: 
							<input type="text" name="firstNameAdd" value={this.state.firstNameAdd} defaultValue="" onChange={this.onChange}/>
						</label>
						<label>Last Name: 
							<input type="text" name="lastNameAdd" value={this.state.lastNameAdd} defaultValue="" onChange={this.onChange}/>
						</label>
						<input type="submit" value="Submit"/>
					</form>
					{
						this.state.customerIdAdd !== "" ? (<p>New Customer Id: {this.state.customerIdAdd}</p>) : null
					}
					<br/>
				</div>
				<div>
					<h2>Lookup Customer</h2>
					<form onSubmit={this.submitLookupCustomer}>
						<label>First Name: 
							<input type="text" name="firstNameLookup" value={this.state.firstNameLookup} defaultValue="" onChange={this.onChange}/>
						</label>
						<label>Last Name: 
							<input type="text" name="lastNameLookup" value={this.state.lastNameLookup} defaultValue="" onChange={this.onChange}/>
						</label>
						<input type="submit" value="Submit"/>
					</form>
					{
						this.state.customerIdLookup !== "" ? (<p>Customer Id Search: {this.state.customerIdLookup}</p>) : null
					}
					<br/>
				</div>
			</Layout>
		);
	}

};

export default Scanner;

