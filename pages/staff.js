
import Layout from '../components/Layout';

class Staff extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			staff: [],

			deleteId: "",
		}
	}

	componentDidMount(){
		/*fetch("http://localhost:3000/api/staff", {
			method: 'DELETE', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
            body: JSON.stringify({"employee_id": "2008f12c-d6ee-4dfb-87e5-8a0c1732e473"})
        })
		.then(res => res.json())
		.then ( (result)=> {
			console.log("DELETE RESULT: " + result);
			}
		)*/
		
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

		console.log(this.state.deleteId);
	}

	onChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState(
			{[name]: value},
		);

		
	}

	handleDeleteSubmit = (event) => {
		event.preventDefault();

		//fetch("http://localhost:3000/api/staff", {
		fetch("https://www.tpmanagement.app/api/staff", {
			method: 'DELETE', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
            body: JSON.stringify({"employee_id": this.state.deleteId})
        })
		.then(res => res.json())
		.then ( (result)=> {	
			console.log("DELETE RESULT: " + result);
			}
		)

		console.log(this.state.deleteId);
	}

	render() {
		const staff = this.state.staff;

		return (
			<Layout>
				<div>
					<h1>Staff</h1>
					<ul>
						{staff.map(s => {
							return (<li key={s.first_name}>{s.first_name} {s.last_name} Id: {s.employee_id}</li>);
						})}
					</ul>
					<form onSubmit={this.handleDeleteSubmit}>
						<br></br>
						<input name="deleteId" type="text" value={this.state.deleteId} onChange={this.onChange}></input>
						<br></br>
						<input type="submit" value="Delete Employee By Id"/>
					</form>
				</div>
			</Layout>
		)
	}
};

export default Staff;

