import Layout from '../components/Layout';
import Popup from '../components/Popup';
import moment from 'moment';
import StoreEntry from '../components/StoreEntry';
import EditShopButton from '../components/EditShopButton';
import DeleteShopButton from '../components/DeleteShopButton';

import Router from 'next/router';
import {attemptLogin, logout, isLoggedIn, getRole} from '../components/Auth';

import {url} from '../components/Const';

class Stores extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			stores: [],
			sales: [],
			showPop: false
		}
	
		this.inputShopName = React.createRef();
		this.inputShopType = React.createRef();
		this.inputShopLocation = React.createRef();

		this.addStore = this.addStore.bind(this);
		this.togglePop = this.togglePop.bind(this);
	}

	async componentDidMount(){
		let role = await getRole();
		if (role !== 'admin' && role !== 'manager'){
			Router.push('/');
		}
		this.getSetup();
	}

	getSetup(){
		fetch(url + "/api/shops")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					stores: result
				});
				console.log(result);
			}
		)

		fetch(url + "/api/sales")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					sales: result
				});
				console.log(result);
			}
		)
	}

	async addStore() {
		var data = {
			"shop_name": this.inputShopName.current.value,
			"location": this.inputShopLocation.current.value,
			"creation_date": moment().format(),
			"shop_type": this.inputShopType.current.value,
		};

		console.log(data);

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', url);
		
		const res = await fetch(url + "/api/shops", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		});

		//OLD
			/*.then(res => console.log(res))
			.catch(error => console.log(error));
	
		this.setState({
			stores: [ ...this.state.stores, data]
		});*/
		this.getSetup();
		this.togglePop();
	}

	async removeStore(i) {
		const res = await fetch(url + "/api/shops", {
			method: 'DELETE', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
		    body: JSON.stringify({"name": i.shop_name})
		});
		this.getSetup();
		//Old 
		/*.then((res) => { console.log(res) })
		.catch(error => console.log(error));

		var index = this.state.stores.indexOf(i);
		var tmp = [...this.state.stores];
		tmp.splice(index, 1);
		this.setState({
			stores: tmp
		})*/
	};

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	//<input ref={this.inputShopType} class="input" type="text" placeholder="Store type" />

	render() {
		const stores = this.state.stores;

		return (
			<Layout>
				<div>
						<button onClick={this.togglePop} class="button is-link is-outlined">
							<span class="icon">
								<i class="fa fa-plus"></i>
							</span>
							<span>Add a store</span>
						</button>


						<Popup closePopup={this.togglePop} showPop={this.state.showPop} title="Add a store" submitText="Add store" btnFunc={this.addStore}>
							<div class="field">
								<label class="label">Store name</label>
								<div class="control">
									<input ref={this.inputShopName} class="input" type="text" placeholder="Store name" />
								</div>
							</div>
							<div class="field">
								<label class="label">Store type</label>
								<div class="control">
									<select ref={this.inputShopType} class="input" type="text" placeholder="Store type" defaultValue="restaurant">
										<option value="restaurant">Restaurant</option>
										<option value="gift_shop">Gift Shop</option>
										<option value="game">Game</option>
										<option value="ticket_store">Ticket Store</option>
									</select>
								</div>
							</div>
							<div class="field">
								<label class="label">Location</label>
								<div class="control">
									<input ref={this.inputShopLocation} class="input" type="text" placeholder="Location" />
								</div>
							</div>
						</Popup>

						<table class="table">
							<thead>
								<th>Store name</th>
								<th>Store type</th>
								<th>Location</th>
								<th>Edit</th>
								<th>Delete</th>
							</thead>
							<tbody>
								{
									stores.map(i => {
										return (
											<tr>
												<td><StoreEntry sales={this.state.sales} shopName={i.shop_name} /></td>
												<td>{i.shop_type}</td>
												<td>{i.location}</td>
												<td class="has-text-centered">
													<EditShopButton shop={i} getSetup={this.getSetup.bind(this)} />
												</td>
												{/*
												<td class="has-text-centered">
													<DeleteShopButton shop={i} getSetup={this.getSetup.bind(this)} />
												</td>
												*/}
												{/*<td class="has-text-centered">
													<button title="Delete Store" class="button is-small" onClick={() => this.removeStore(i)}>
														<span  class="icon has-text-danger">
															<i class="fa fa-times"></i>
														</span>
													</button>
												</td>*/}
												<td><DeleteShopButton shop={i} getSetup={this.getSetup.bind(this)} removeStore={this.removeStore.bind(this)}/></td>
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

export default Stores;


