
import Layout from '../components/Layout';

class Staff extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			staff: []
		}
	}

	componentDidMount(){
		//fetch("http://localhost:3000/api/staff")
		fetch("https://tpmanagement.app/api/staff")
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

	render() {
		const staff = this.state.staff;

		return (
			<Layout>
				<div>
					<h1>Staff</h1>
					<ul>
						{staff.map(s => {
							return (<li key={s.first_name}>{s.first_name} {s.last_name}</li>);
						})}
					</ul>
				</div>
			</Layout>
		)
	}
};

export default Staff;

