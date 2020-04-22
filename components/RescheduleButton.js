import Popup from '../components/Popup';
import {url} from '../components/Const';

class RescheduleButton extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showPop: false
		}
		
		this.togglePop = this.togglePop.bind(this);
		this.changeDate = this.changeDate.bind(this);

		this.inputNewDate = React.createRef();
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	async changeDate() {
		const i = this.props.event;
		console.log(this.inputNewDate.current.value);

		const data = {"event_id": i.event_id, "date": this.inputNewDate.current.value};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', url);

		const res = await fetch(url + "/api/events", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'PUT',
			mode: 'cors'
		});

		this.togglePop();
		this.props.getEvents();
	}

	render() {
		return (
			<div>
				<button class="button is-small" onClick={this.togglePop}>
					<span class="icon has-text-info">
						<i class="fa fa-calendar"></i>
					</span>
				</button>


				<Popup closePopup={this.togglePop} showPop={this.state.showPop} title="Reschedule Event" submitText="Change" btnFunc={this.changeDate}>
					<div class="field">
						<label class="label">New Date</label>
						<div class="control">
							<input ref={this.inputNewDate} class="input" type="date"/>
						</div>
					</div>
				</Popup>
			</div>
		);
	}
};

export default RescheduleButton;