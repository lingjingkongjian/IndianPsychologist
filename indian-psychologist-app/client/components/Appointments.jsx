import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

require('./../js/kurento.js');
import './Appointments.css';

class Appointments extends React.Component {

    constructor(props: any){
        super(props);
        this.state = { isOpen: false };
    }

    componentDidMount(){
        prepareKurento();
    }


    renderStatus(appointment) {
		// render the online / offline status of the doctor
		var status = 'offline';
		if(appointment.doctor.status && appointment.doctor.status.online) {
			status = <b>online</b>;
		}
		return status;
	}

	onCall() {
        this.setState({isOpen: true});
	}

	render() {
		var appointments = this.props.appointments.map(a => { return (
			<Ons.ListItem key={a._id} tappable onClick={this.onCall.bind(this)}>
				<span className="list-item__title">Appointment with {a.doctor.profile.name}</span>
				<span className="list-item__subtitle"> {this.renderStatus(a)} - call now</span>
			</Ons.ListItem>
		)});
		return (
			<Ons.Page
				renderModal={() => (
					<Ons.Modal isOpen={this.state.isOpen}>
                        <div>
                            <div id="videoBig">
                                <video id="videoOutput" poster="img/webrtc.png"></video>
                            </div>
                            <div id="videoSmall">
                                <video id="videoInput" width="240px" height="180px" poster="img/webrtc.png"></video>
                            </div>
                        </div>
                        <p>
                            <Ons.Button onClick={() => this.setState({isOpen: false})}>
                                Close
                            </Ons.Button>
                        </p>
					</Ons.Modal>
				)}>
				<Ons.List>
					{appointments}
				</Ons.List>
                <div className="col-md-5">
                    <label className="control-label" htmlFor="name">Name</label>
                    <div className="row">
                        <div className="col-md-6">
                            <input id="name" name="name" className="htmlForm-control" type="text"></input>
                        </div>
                        <div className="col-md-6 text-right">
                            <a id="register" href="#" className="btn btn-primary">
                                <span className="glyphicon glyphicon-plus"></span> Register</a>
                        </div>
                    </div>
                    <label className="control-label" htmlFor="peer">Peer</label>
                    <div className="row">
                        <div className="col-md-6">
                            <input id="peer" name="peer" className="htmlForm-control" type="text"></input>
                        </div>
                        <div className="col-md-6 text-right">
                            <a id="call" href="#" className="btn btn-success" disabled="disabled">
                                <span className="glyphicon glyphicon-play"></span> Call</a>
                            <a id="terminate" href="#" className="btn btn-danger" disabled="disabled">
                                <span className="glyphicon glyphicon-stop"></span> Stop</a>
                        </div>
                    </div>
                    <label className="control-label" htmlFor="console">Console</label>
                    <div id="console" className="democonsole">
                        <ul></ul>
                    </div>
                </div>
			</Ons.Page>
		);
	}
}


export default createContainer(() => {
  return {
    appointments: AppointmentsCollection.find({'userId': Meteor.userId()}).fetch()
  };
}, Appointments);
