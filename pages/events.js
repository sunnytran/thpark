import Layout from '../components/Layout';
import Popup from '../components/Popup';
import EventEntry from '../components/EventEntry';
import Moment from 'moment';
import moment from 'moment';

class Events extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			events: [],
			issues: [],
			showEventPop: false,
		}
		
		this.inputEventName   = React.createRef();
		this.inputEventType   = React.createRef();
		this.inputDate	   = React.createRef();
		this.inputLocation   = React.createRef();

		this.toggleEventPop = this.toggleEventPop.bind(this);
		this.addEvent = this.addEvent.bind(this);
		this.removeEvent = this.removeEvent.bind(this);
		this.rescheduleEvent = this.rescheduleEvent.bind(this);
	}

	componentDidMount(){
		fetch("https://www.tpmanagement.app/api/events")
		.then(res => res.json())
		.then (
			(result)=> {
				this.setState({
					events: result
				});
				console.log(result);
			}
		)
	}

	toggleEventPop() {
		this.setState((prev, props) => {
			const newPop = !prev.showEventPop;

			return { showEventPop: newPop };
		});
	}

	addEvent() {
		var data = {
			"event_name": this.inputEventName.current.value,
			"event_type": this.inputEventType.current.value,
			"date": moment(this.inputDate.current.value, 'M/D/YY'),
			"location": this.inputLocation.current.value
		};

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Origin', 'https://www.tpmanagement.app');
		
		fetch("https://www.tpmanagement.app/api/events", {
			body: JSON.stringify(data),
			headers: headers,
			method: 'POST',
			mode: 'cors'
		})
			.then(res => console.log(res))
			.catch(error => console.log(error));
	
		this.setState({
			events: [ ...this.state.events, data]
		});
		this.toggleEventPop();
	}

	removeEvent(i) {
		fetch("https://www.tpmanagement.app/api/events", {
			method: 'DELETE', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
      		body: JSON.stringify({"event_id": i.event_id})
    	})
		.then((res) => { console.log(res) })
		.catch(error => console.log(error));

		var index = this.state.events.indexOf(i);
		var tmp = [...this.state.events];
		tmp.splice(index, 1);
		this.setState({
			events: tmp
		})
	};

	rescheduleEvent(i) {
		/*var index = this.state.events.indexOf(i);

		fetch("https://www.tpmanagement.app/api/events", {
			method: 'PUT', 
			headers: {'Content-Type': 'application/json; charset=utf-8'}, 
      		body: JSON.stringify({"event_id": i.event_id, "date": moment(this.inputDate.current.value, 'M/D/YY')})
	    })
			.then((res) => { console.log(res) })
			.catch(error => console.log(error));

			var index = this.state.events.indexOf(i);
			var tmp = [...this.state.events];
			tmp.splice(index, 1);
			this.setState({
				events: tmp
			})
		};*/
	}

	render() {
		const events = this.state.events;

		return (
			<Layout>
				<div>
					<button onClick={this.toggleEventPop} class="button is-link is-outlined">
						<span class="icon">
							<i class="fa fa-plus"></i>
						</span>
						<span>Add an event</span>
					</button>

					<Popup closePopup={this.toggleEventPop} showPop={this.state.showEventPop} title="Add an event" submitText="Add event" btnFunc={this.addEvent}>
						<div class="columns">
							<div class="column is-half field">
								<label class="label">Event name</label>
								<div class="control">
									<input ref={this.inputEventName} value={this.state.inputEventName} class="input" type="text" placeholder="Event name" />
								</div>
							</div>
							<div class="column is-half field">
								<label class="label">Type</label>
								<div class="control">
									<input ref={this.inputEventType} class="input" type="text" placeholder="Type" />
								</div>
							</div>
						</div>
						
						<div class="columns">
							<div class="column is-half field">
								<label class="label">Location</label>
								<div class="control">
									<input ref={this.inputLocation} class="input" type="text" placeholder="Location" />
								</div>
							</div>
							<div class="column is-third field">
								<label class="label">Date</label>
								<div class="control">
									<input ref={this.inputDate} class="input" type="text" placeholder="Date" />
								</div>
							</div>
						</div>
						
					</Popup>

					<table class="table">
						<thead>
							<th>Upcoming Events</th>
							<th>Type</th>
							<th>Date</th>
							<th>Location</th>
							<th>Reschedule</th>
							<th>Cancel</th>
						</thead>

						<tbody>
						{
						events.map(i => {
									return (
										<tr>
											<td>{i.event_name}</td>
											<td>{i.event_type}</td>
											<td>{Moment(i.date).format('M/D/YY')}</td>
											<td>{i.location}</td>
											<button class="button-is-small" onClick={() => this.rescheduleEvent(i)}>
												<span class="icon">
													<i class="fa fa-calendar"></i>
												</span>
											</button>
											<td>

												<button class="button is-small" onClick={() => this.removeEvent(i)}>
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

export default Events;

