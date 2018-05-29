import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ons from 'onsenui';

import React from 'react';

import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import './Appointments.css';
import WriteSummary from './WriteSummary.jsx';

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
        this.state = { isOpen: false, activeAppointment: null, activeId: null };
        //this.changeAppointment = this.changeAppointment.bind();
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
        AppointmentsCollection.update({'_id': this.state.activeId}, {$set: {'calling': false}})
        setTimeout(function() {
            this.setState({isOpen: false, activeId: null, videochat_src: "https://jonathanlehner.com/room/"});
        }.bind(this), 1500);
	}

	onCall(id, element) {
		console.log(element);
		console.log(id);
        this.setState({isOpen: true, activeAppointment: id, activeId: id, videochat_src: "https://jonathanlehner.com/room/"+id});
        AppointmentsCollection.update({'_id': id}, {$set: {'calling': true}})
	}

	changeAppointment(event, appointment, state){ // 0: pending, 1: confirmed, 2: canceled, 3: finished
	    event.stopPropagation();
        event.preventDefault();
        AppointmentsCollection.update({'_id': appointment._id}, {$set: {'confirmed': state}})

        // send email
        Meteor.call('sendMail', {
            status: state,
            userId: appointment.userId,
            doctorId: appointment.doctorId,
            appointment_id: appointment._id
        }, (err, res) => {
            if (err) {
                alert(err);
            } else {
                // success!
            }
        });
    }

    onWriteSummary(appointment) {
	    console.log(this.props.navigator);
        this.props.navigator.pushPage({
            'component': WriteSummary,
            'props': {
                appointment: appointment
            }
        }, {animation: 'slide'});
    }

    toggleOnline(id, doctorId, current) {
        console.log(current);
        Users.update(doctorId, {$set:{'status.online': !current}}); //toggle status
    }

	render() {
		var appointments = this.props.appointments_list.map(a => {
			if(a.calling==true && this.state.activeId==null) {
                ons.notification.alert("You have a call");
                this.setState({isOpen: true, activeAppointment: a._id, activeId: a._id, videochat_src: "https://jonathanlehner.com/room/"+a._id});
            }
			console.log(a);
			if(a.doctor !== undefined){
				return (
				<Ons.ListItem key={a._id} tappable>
					<span className="list-item__title">Appointment with {Meteor.user()._id != a.doctorId ? a.doctor.profile.name : "(patient) "+a.user.profile.name} - time: {a.date} </span>
					<span className="list-item__subtitle">
                        {this.renderStatus(a)} -
                        {a.confirmed == 1 ? <a onClick={this.onCall.bind(this, a._id)}>call now</a> : ""}
                         - {a.confirmed == 1 ? "confirmed " :
                            (a.confirmed == 0 ? "unconfirmed " :
                                a.confirmed == 3 ? "finished " : "canceled")}
                        {Meteor.user()._id != a.doctorId ? "" :
                            a.confirmed == 0 ?
                            <a onClick={(event) => this.changeAppointment(event, a, 1)}>confirm</a> :
                                a.confirmed == 1 ?
                                 <span>
                                     <a onClick={(event) => this.changeAppointment(event, a, 2)}>cancel</a> -
                                     <a onClick={(event) => this.changeAppointment(event, a, 3)}>mark as finished</a>
                                 </span>
                                    :
                                a.confirmed == 3 ?
                                     <a onClick={(event) => this.onWriteSummary(a)}>write summary</a>
                                    :
                                    ""
                        }

					</span>
				</Ons.ListItem>);
			}
		});
		return (
			<Ons.Page
				renderModal={() => (
					<Ons.Modal isOpen={this.state.isOpen}>
						<iframe allow="geolocation *; microphone *; camera *; midi *; encrypted-media *" id="videochat_iframe" style={divStyle} src={this.state.videochat_src} scrolling="no"/>
						<Ons.Button style={divStyle2} onClick={this.onClose.bind(this)}>
                            Close
                        </Ons.Button>
					</Ons.Modal>
				)}>
                <div style={{margin: "10px"}}>
                    Steps: <br/>
                    1. Your request is sent to the psychologist<br/>
                    2. He/she confirms or rejects your time-slot within 24h<br/>
                    3. After each session you will get a short summary in "Diagnoses"<br/>
                    We will provide confirmation emails and reminders.
                </div>
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
    const appointments_list_users = AppointmentsCollection.find({ userId: Meteor.userId() }).fetch();
    const appointments_list_doctors = AppointmentsCollection.find({ doctorId: Meteor.userId() }).fetch();
    return {
        currentUser: Meteor.user(),
        listLoading: !appointments_handle.ready(),
        ///below doesn't make sense. not as it should work -- switched
        appointments_list: Meteor.user().profile.isDoctor ? appointments_list_doctors : appointments_list_users, ///listExists is broken somehow? appointments?
    };
})(Appointments);
