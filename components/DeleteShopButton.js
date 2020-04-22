import Popup from '../components/Popup';

class DeleteShopButton extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showPop: false
		}

		this.togglePop = this.togglePop.bind(this);
	}

	togglePop() {
		this.setState((prev, props) = > {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	async removeStore(i) {
		const res = await fetch("https://www.tpmanagement.app/api/shops", {
			method: 'DELETE',
			headers : {'Content-Type': 'application/json; charset=utf-8'},
			body : JSON.stringify({"name": i.shop_name})
		});
		this.getSetup();
	};

	render() {
		const shop = this.props.shop;
		return(
			<div>
				< button class = "button is-small" onClick = { this.togglePop } >
					<span class = "icon">
							<i class = "fa fa-times">< / i>
					< / span>
				< / button>

				< Popup closePopup = { this.togglePop } showPop = { this.state.showPop } title = "Delete Confirmation" submitText = "Confirm" btnFunc = { this.removeStore(i) } >
					<div class = "field">
						<label class="label"> Are you sure you want to delete this shop? < /label>
					< / div>
				< / Popup>
			< / div>
		);
	}
};
