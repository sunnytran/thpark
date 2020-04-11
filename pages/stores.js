	
import Layout from '../components/Layout';
import Popup from '../components/Popup';
import moment from 'moment';
import StoreEntry from '../components/StoreEntry';

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

	componentDidMount(){
		//fetch("http://localhost:3000/api/staff")
		fetch("https://www.tpmanagement.app/api/shops")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					stores: result
				});
				console.log(result);
			}
		)

		fetch("https://www.tpmanagement.app/api/sales")
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

	addStore() {
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
		headers.append('Origin', 'https://www.tpmanagement.app');
		
		fetch("https://www.tpmanagement.app/api/shops", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
			.then(res => console.log(res))
			.catch(error => console.log(error));
	
		this.setState({
			stores: [ ...this.state.stores, data]
		});
		this.togglePop();
	}

	removeStore(i) {
		fetch("https://www.tpmanagement.app/api/shops", {
			method: 'DELETE', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
      body: JSON.stringify({"name": i.shop_name})
    })
		.then((res) => { console.log(res) })
		.catch(error => console.log(error));

		var index = this.state.stores.indexOf(i);
		var tmp = [...this.state.stores];
		tmp.splice(index, 1);
		this.setState({
			stores: tmp
		})
	};

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

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
									<input ref={this.inputShopType} class="input" type="text" placeholder="Store type" />
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
												<td>
													<button class="button is-small" onClick={() => this.removeStore(i)}>
														<span class="icon">
															<i class="fa fa-times"></i>
														</span>
													</button>
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

export default Stores;


