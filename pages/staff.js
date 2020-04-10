
import Layout from '../components/Layout';
import Popup from '../components/Popup';

class Staff extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			staff: [],
			showPop: false
		}
		
		this.inputFirst		= React.createRef();
		this.inputLast		= React.createRef();
		this.inputAccess 	= React.createRef();
		this.inputUser		= React.createRef();
		this.inputPass		= React.createRef();

		this.addMember 		= this.addMember.bind(this);
		this.togglePop 		= this.togglePop.bind(this);
		this.removeMember = this.removeMember.bind(this);
	}

	componentDidMount(){
		//fetch("http://localhost:3000/api/staff")
		fetch("https://www.tpmanagement.app/api/staff")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					staff: result
				});
				console.log(result);
			}
		)
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	addMember() {
		var data = {
			"first_name": this.inputFirst.current.value,
			"last_name": this.inputLast.current.value,
			"access_level": this.inputAccess.current.value,
			"username": this.inputUser.current.value,
			"password": this.inputPass.current.value
		};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');
	

		fetch("https://www.tpmanagement.app/api/staff", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
			.then(res => console.log(res))
			.catch(error => console.log(error));
	
		this.setState({
			staff: [ ...this.state.staff, data]
		});
		this.togglePop();
	}

	removeMember(i) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		fetch("https://www.tpmanagement.app/api/staff", {
			method: 'DELETE', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
            body: JSON.stringify({"employee_id": i.employee_id})
        })
		.then(res => res.json())
		.then ( (result)=> {	
			console.log("DELETE RESULT: " + result);
			}
		)


		var index = this.state.staff.indexOf(i);
		var tmp = [...this.state.staff];
		tmp.splice(index, 1);
		this.setState({
			staff: tmp
		});
	}

	render() {
		const staff = this.state.staff;

		return (
			<Layout>
				<div>
					<button onClick={this.togglePop} class="button is-link is-outlined">
						<span class="icon">
							<i class="fa fa-plus"></i>
						</span>
						<span>Add a staff member</span>
					</button>

					<Popup closePopup={this.togglePop} showPop={this.state.showPop} title="Add a staff member" btnFunc={this.addMember} submitText="Add staff member">
						<div class="columns">
							<div class="field column is-third">
								<label class="label">First name</label>
								<div class="control">
									<input ref={this.inputFirst} class="input" type="text" placeholder="First name" />
								</div>
							</div>
							<div class="field column is-third">
								<label class="label">Last name</label>
								<div class="control">
									<input ref={this.inputLast} class="input" type="text" placeholder="Last name" />
								</div>
							</div>
							<div class="field column is-third">
								<label class="label">Access level</label>
								<div class="control">
									<input ref={this.inputAccess} class="input" type="text" placeholder="Access level" />
								</div>
							</div>
						</div>
						<div class="columns">
							<div class="field column is-half">
								<label class="label">Username</label>
								<div class="control">
									<input ref={this.inputUser} class="input" type="text" placeholder="Username" />
								</div>
							</div>
							<div class="field column is-half">
								<label class="label">Password</label>
								<div class="control">
									<input ref={this.inputPass} class="input" type="password" placeholder="Password" />
								</div>
							</div>
						</div>
					</Popup>

						<table class="table">
							<thead>
								<th>First name</th>
								<th>Last name</th>
								<th>Delete</th>
							</thead>

							<tbody>
								{
									staff.map(i => {
										return (
											<tr>
												<td>{i.first_name}</td>
												<td>{i.last_name}</td>
												<td>

													<button class="button is-small" onClick={() => this.removeMember(i)}>
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

export default Staff;
