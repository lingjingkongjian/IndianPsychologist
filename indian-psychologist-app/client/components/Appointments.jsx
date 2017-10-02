import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class Appointments extends React.Component {

	renderStatus(appointment) {
		// render the online / offline status of the doctor
		var status = 'offline';
		if(appointment.doctor.status && appointment.doctor.status.online) {
			status = <b>online</b>;
		}
		return status;
	}

	onCall() {
		alert('make video call now...');
	}

	render() {
		
		var appointments = this.props.appointments.map(a => { return (
			<Ons.ListItem key={a._id} tappable onClick={this.onCall.bind(this)}>
				<span className="list-item__title">Appointment with {a.doctor.profile.name}</span>
				<span className="list-item__subtitle"> {this.renderStatus(a)}</span>
			</Ons.ListItem>
		)});
		return (
			<Ons.Page>
				<Ons.List>
					{appointments}
				</Ons.List>
			</Ons.Page>
		);
	}
}


export default createContainer(() => {
  return {
    appointments: AppointmentsCollection.find({'userId': Meteor.userId()}).fetch()
  };
}, Appointments);
