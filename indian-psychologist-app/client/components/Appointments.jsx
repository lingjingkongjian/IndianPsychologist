import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import React from 'react';

import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import './Appointments.css';

var divStyle = {
    width: "100%",
	height: "calc(100% - 100px)",
	position: "absolute",
	top: "0px",
	left: "0px",
    border: "0px",
	};

var divStyle2 = {
    position: "absolute",
    bottom: "30px",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80px",
}


class Appointments extends React.Component {

    constructor(props: any){
        super(props);
        this.state = { isOpen: false, activeAppointment: null };
    }

    componentDidMount(){
    }


    renderStatus(appointment) {
		// render the online / offline status of the doctor
		var status = 'offline';
		if(appointment.doctor.status && appointment.doctor.status.online) {
			status = <b>online</b>;
		}
		return status;
	}

	onClose(){
        this.setState({isOpen: false, videochat_src: "https://jonathanlehner.com/room/"});
	}

	onCall(id, element) {
		console.log(element);
		console.log(id);
        this.setState({isOpen: true, activeAppointment: id, videochat_src: "https://jonathanlehner.com/room/"+id});
	}

	render() {
		var appointments = this.props.appointments_list.map(a => {
			console.log(a);
			if(a.doctor !== undefined){
				return (
				<Ons.ListItem key={a._id} tappable onClick={this.onCall.bind(this, a._id)}>
					<span className="list-item__title">Appointment with {a.doctor.profile.name}</span>
					<span className="list-item__subtitle"> {this.renderStatus(a)} - call now</span>
				</Ons.ListItem>);
			}
		});
		return (
			<Ons.Page
				renderModal={() => (
					<Ons.Modal isOpen={this.state.isOpen}>
						<iframe id="videochat_iframe" style={divStyle} src={this.state.videochat_src} scrolling="no"></iframe>
						<Ons.Button style={divStyle2} onClick={this.onClose.bind(this)}>
                            Close
                        </Ons.Button>
					</Ons.Modal>
				)}>
				<Ons.List>
					{appointments}
				</Ons.List>
			</Ons.Page>
		);
	}
}

export default AppointmentsContainer = withTracker(props => {
    //var users = Users.find().fetch();

    const appointments_handle = Meteor.subscribe('appointments');
    return {
        currentUser: Meteor.user(),
        listLoading: !appointments_handle.ready(),
        appointments_list: AppointmentsCollection.find().fetch(), ///listExists is broken somehow? appointments?
    };
})(Appointments);
