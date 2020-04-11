
import Popup from './Popup';
import Report from './Report';
import Moment from 'moment';
import moment from 'moment';

class EventEntry extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			//reports: [],
			showPop: false
		}
		this.togglePop = this.togglePop.bind(this);
	}

	togglePop() {
		this.setState((prev, props) => {
			const newPop = !prev.showPop;

			return { showPop: newPop };
		});
	}

	render() {
		const event = this.props.event;

		return (
			<b>{event.event_name}</b>
		);
	}
}

export default EventEntry;

