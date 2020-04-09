
import Layout from '../components/Layout';

class Rides extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			rides: [],
			deleteRide: "",
		}
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
		fetch("https://www.tpmanagement.app/api/rides", {
			method: 'DELETE', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
            body: JSON.stringify({"name": this.state.deleteRide})
        })
		.then(res => res.json())
		.then ( (result)=> {	
			console.log("DELETE RESULT: " + result);
			}
		)

		console.log(this.state.deleteId);
	}

	render() {
		const rides = this.state.rides;

		return (
			<Layout>
				<div>
					<h1>Rides</h1>
					<ul>
						{rides.map(s => {
							return (<li key={s.ride_name}>{s.ride_name}</li>);
						})}
					</ul>
					<form onSubmit={this.handleDeleteSubmit}>
						<br></br>
						<input name="deleteRide" type="text" value={this.state.deleteRide} onChange={this.onChange}></input>
						<br></br>
						<input type="submit" value="Delete Ride by Ride Name"/>
					</form>
				</div>
			</Layout>
		)
	}
};

export default Rides;

