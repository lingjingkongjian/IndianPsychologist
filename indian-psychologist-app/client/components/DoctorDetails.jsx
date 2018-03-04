import { Meteor } from 'meteor/meteor';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

export default class DoctorDetails extends React.Component {

    constructor(props) {
        super(props);
        var date = moment(); //.add(3, 'days');
        var minute = 30 * Math.round(date.minutes() / 30);
        date = date.minutes(minute);
        date = date.seconds(0);
        this.state = {
            date: date,
            excluded: [],
            disabled: true
        };
        for(var i=0; i<6; i++){
            this.state.excluded.push(moment().hours(i).minutes(0));
            this.state.excluded.push(moment().hours(i).minutes(30));
        }
        for(var i=21; i<24; i++){
            this.state.excluded.push(moment().hours(i).minutes(0));
            this.state.excluded.push(moment().hours(i).minutes(30));
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        var excluded = [];
        for(var i=0; i<6; i++){
            excluded.push(moment().hours(i).minutes(0));
            excluded.push(moment().hours(i).minutes(30));
        }
        for(var i=21; i<24; i++){
            excluded.push(moment().hours(i).minutes(0));
            excluded.push(moment().hours(i).minutes(30));
        }
        const appointments_list = AppointmentsCollection.find({ doctorId: this.props.doctor._id }).fetch();
        appointments_list.map(appointment => {
            var appointment_date = moment(appointment.date, "ddd, MMMM Do YYYY, HH:mm:ss A");
            console.log(date);
            console.log(appointment_date);
            if(date.isSame(appointment_date, 'day')) {
                h = appointment_date.hours();
                m = appointment_date.minutes();
                var mom = moment().hours(h).minutes(m);
                excluded.push(mom);
                console.log(appointment);
                console.log(excluded);
            }
        });
        this.setState({
            date: date,
            excluded: excluded,
            disabled: false
        });

    }

    isAvailable(date){
        //console.log(date);
        return date.isoWeekday()<6;
    }

	renderToolbar() {
		return (
			<Ons.Toolbar>
				<div className='left'>
					<Ons.BackButton> Back </Ons.BackButton>
				</div>
				<div className='center'>Doctor Details</div>
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
		var specialitiesList = this.props.doctor.profile.specialities.split(",").map(speciality => <li key={speciality}><b>{speciality}</b></li>);
		return (
			<div>
				Specialities: 
				<ul>
					{specialitiesList}
				</ul>
			</div>
		);
	}

	onPressBookDoctor() {
        if(this.state.disabled === false) {
            let total = AppointmentsCollection.find({userId: Meteor.userId()}).count();
            if(total <= 5) {
                if (!Meteor.user().profile.isDoctor) {
                    var appointment = {
                        'userId': Meteor.userId(),
                        'doctorId': this.props.doctor._id,
                        'createdAt': new Date(),
                        'confirmed': 0,
                        'date': this.state.date.format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    };
                    var appointment_id = AppointmentsCollection.insert(appointment);
                    ONS.notification.toast('Appointment requested! - Please check your emails for further information', {timeout: 3000});
                    this.props.navigator.popPage();

                    // send email
                    Meteor.call('sendMail', {
                        status: 0, // unconfirmed
                        userId: Meteor.userId(),
                        doctorId: this.props.doctor._id,
                        appointment_id: appointment_id
                    }, (err, res) => {
                        if (err) {
                            alert(err);
                        } else {
                            // success!
                        }
                    });
                }
                else {
                    ons.notification.alert('Please register as a patient-user to book appointments!');
                }
            }
            else{
                ons.notification.alert('You can only request a maximum of 5 appointments. Please contact customer service.');
            }
        }
        else{
            ons.notification.alert('Please choose a date');
        }
	}

	render() {
		var doctor = this.props.doctor;
		var specialities = '';

		return (
			<Ons.Page 
				renderToolbar={this.renderToolbar.bind(this)}
				contentStyle={{backgroundColor: '#eee', padding: 10}}
			>
					<Ons.Card style={{textAlign: 'center'}}>
						{this.renderAvatar()}
						<h2 className="card__title">{doctor.profile.name}</h2>
						<div className="card__content" style={{textAlign: 'left'}}>
							{this.renderSpecialities()}
                            Additional Information:
                            <p>
								{doctor.profile.additionalInfo}
							</p>
							</div>
					</Ons.Card>
                    Preferred Date:
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChange}
                        filterDate={this.isAvailable}
                        placeholderText="Select a weekday"
                        showTimeSelect
                        excludeTimes={this.state.excluded}
                        dateFormat="LLL"
                        withPortal />
                <Ons.Button modifier="large" onClick={this.onPressBookDoctor.bind(this)}>Request Doctor</Ons.Button>
			</Ons.Page>
		);	
	}
}

