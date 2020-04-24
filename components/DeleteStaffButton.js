import Popup from '../components/Popup';
import {url} from '../components/Const';

class DeleteStaffButton extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showPop: false
		}
		
		this.togglePop = this.togglePop.bind(this);
		this.delete = this.delete.bind(this);
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	async delete() {
		const i = this.props.employee;
		await this.props.removeStaff(i);
		this.togglePop();
		this.props.getStaff();
	}

	render() {
		return (
			<div>
				<button title="Delete Employee" class="button is-small" onClick={this.togglePop}>
					<span class="icon has-text-danger">
						<i class="fa fa-times" ></i>
					</span>
				</button>


				<Popup closePopup={this.togglePop} showPop={this.state.showPop} title="Delete Employee" submitText="Delete" btnFunc={this.delete}>
					<div class="columns">
							<div class="column has-text-centered">
								<h1 class="title">Did you want to delete this employee?</h1>
							</div>
						</div>
				</Popup>
			</div>
		);
	}
};

export default DeleteStaffButton;