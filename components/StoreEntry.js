
import Popup from './Popup';
import Report from './Report';
import Moment from 'moment';
import moment from 'moment';

class StoreEntry extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			showPop: false
		}
		this.togglePop = this.togglePop.bind(this);
	}

	componentDidMount(){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');
		
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	render() {
			return (
				<div>
					<a href="#" class="has-text-black" onClick={this.togglePop}>
						<b>{this.props.shopName}</b>
					</a>

					<Popup submitText="OK" closePopup={this.togglePop} showPop={this.state.showPop} title={this.props.shopName + " sales"} btnFunc={this.togglePop}>


						<table class="table">
							<thead>
								<th>Item name</th>
								<th>Item type</th>
								<th>Amount</th>
								<th>Time</th>
								<th>Customer ID</th>
							</thead>

							<tbody>
								{
									this.props.sales.filter(i=> {
										return this.props.shopName == i.sale_from
									}).map(i => {
										return (
											<tr>
												<td>{i.sale_item}</td>
												<td>{i.sale_type}</td>
												<td>{i.sale_amount}</td>
												<td>{Moment(i.timestamp).format('M/D/YY')}</td>
												<td>{i.customer_id}</td>
											</tr>
										);
									})
								}
							</tbody>
						</table>

					</Popup>
				</div>
		);
	}
}

export default StoreEntry;


						//<table class="table">
							//<thead>
								//<th>Issue type</th>
								//<th>Date issued</th>
								//<th>Date resolved</th>
								//<th>Resolved by</th>
								//<th>Severity</th>
								//<th>Fix issue</th>	
							//</thead>

							//<tbody>
								//{
									//reports.filter(i=> {
										//if (i.ride_name == ride.ride_name)
											//console.log(i.issue_id);
										//else
											//console.log("NO MATCH " + i.ride_name);

										//return i.ride_name == ride.ride_name
									//}).map(i => {

										//return (

											//<tr class={!i.resolved ? "has-text-danger" : ""}>
												//<td><b>{i.type}</b></td>
												//<td>{Moment(i.start_timestamp).format('M/D/YY')}</td>
												//<td>{Moment(i.end_timestamp).format('M/D/YY')}</td>
												//<td>{i.resolved_by}</td>
												//<td>{i.severity}</td>
												//<td>
													//<button class="button is-small" onClick={() => this.fixIssue(i.issue_id)}>
														//<span class="icon">
															//<i class="fa fa-check"></i>
														//</span>
													//</button>
												//</td>
											//</tr>
										//);
									//})
								//}
							//</tbody>
						//</table>

