import Popup from '../components/Popup';

class EditShopButton extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showPop: false
		}
		
		this.togglePop = this.togglePop.bind(this);
		this.edit = this.edit.bind(this);

		this.inputNewName = React.createRef();
		this.inputNewLocation = React.createRef();
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	async edit() {
		const i = this.props.shop;

		const data = {"target_name": i.shop_name, "shop_name": this.inputNewName.current.value, "location": this.inputNewLocation.current.value};
		console.log("NAME: " + data.shop_name);
		console.log("LOCATION: " + data.location);

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');

		const res = await fetch("https://www.tpmanagement.app/api/shops", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'PUT',
			mode: 'cors'
		});

		this.togglePop();
		this.props.getSetup();
	}

	render() {
		const shop = this.props.shop;

		return (
			<div>
				<button class="button is-small" onClick={this.togglePop}>
					<span class="icon has-text-info">
						<i class="fa fa-edit"></i>
					</span>
				</button>


				<Popup closePopup={this.togglePop} showPop={this.state.showPop} title="Edit Shop" submitText="Change" btnFunc={this.edit}>
					<div class="field">
						<label class="label">Edit Name</label>
						<div class="control">
							<input ref={this.inputNewName} class="input" type="text" defaultValue={shop.shop_name}/>
						</div>
						<label class="label">Edit Location</label>
						<div class="control">
							<input ref={this.inputNewLocation} class="input" type="text" defaultValue={shop.location}/>
						</div>
					</div>
				</Popup>
			</div>
		);
	}
};

export default EditShopButton;