import { Meteor } from 'meteor/meteor';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const divStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "600px",
}
const textarea_style = {
    width: "100%",
    marginBottom: "20px",
}

export default class WriteSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            report: '',
        };

        console.log(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({report: event.target.value});
    }

	renderToolbar() {
		return (
			<Ons.Toolbar>
				<div className='left'>
					<Ons.BackButton> Back </Ons.BackButton>
				</div>
				<div className='center'>Consultation summary</div>
			</Ons.Toolbar>
		);
	}

	renderAvatar() {
	    if(!this.props.doctor.profile.avatar) {
	      var avatar = <Ons.Icon size={200} icon="ion-person" />;
	    } else {
	      var avatar = <img style={{maxHeight: 150}} src={this.props.doctor.profile.avatar} alt=""/>
	    }
	    return avatar;
	}

	renderSpecialities() {
		var specialitiesList = this.props.doctor.profile.specialities.map(speciality => <li key={speciality}><b>{speciality}</b></li>);
		return (
			<div>
				Specialities: 
				<ul>
					{specialitiesList}
				</ul>
			</div>
		);
	}

	onsendReport() {
        if(this.state.report != '') {
            var report = {
                'userId': this.props.appointment.userId,
                'doctorId': Meteor.userId(),
                'createdAt': new Date(),
                'appointmentId': this.props.appointment._id,
                'message': this.state.report,
            };
            ReportsCollection.insert(report);
            ONS.notification.toast('Report submitted!', {timeout: 2000});
            this.props.navigator.popPage();
        }
        else{
            ons.notification.alert('Report cannot be empty!');
        }
	}

	render() {
		var doctor = this.props.doctor;
		var specialities = '';

		return (
			<Ons.Page 
				renderToolbar={this.renderToolbar.bind(this)}
				contentStyle={{backgroundColor: '#eee', padding: 10}}>
                <h2>Appointment with {this.props.appointment.user.profile.name}</h2>
                <p>Date: {this.props.appointment.date}</p>
				<p>
                    <textarea value={this.state.report} onChange={this.handleChange} style={textarea_style} className="textarea" rows="3" placeholder="Please write a short summary of your consultation with the patient. He or she will be able to read it later."></textarea>
                </p>
				<Ons.Button modifier="large" onClick={this.onsendReport.bind(this)}>Submit report</Ons.Button>
			</Ons.Page>
		);	
	}
}

