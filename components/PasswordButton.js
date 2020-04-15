import Popup from '../components/Popup';

class PasswordButton extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showPop: false
		}
		
		this.togglePop = this.togglePop.bind(this);
		this.changePassword = this.changePassword.bind(this);

		this.inputPassword = React.createRef();
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	async changePassword() {
		const i = this.props.employee;

		const data = {"employee_id": i.event_id, "password": this.inputPassword.current.value};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		const res = await fetch("https://www.tpmanagement.app/api/staff", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'PUT',
			mode: 'cors'
		});

		this.togglePop();
		this.props.getStaff();
	}

	render() {
		return (
			<div>
				<button class="button is-small" onClick={this.togglePop}>
					<span class="icon has-text-info">
						<i class="fa fa-key"></i>
					</span>
				</button>


				<Popup closePopup={this.togglePop} showPop={this.state.showPop} title="Change Password" submitText="Change" btnFunc={this.changePassword}>
					<div class="field">
						<label class="label">Password</label>
						<div class="control">
							<input ref={this.inputPassword} class="input" type="password"/>
						</div>
					</div>
				</Popup>
			</div>
		);
	}
};

export default PasswordButton;