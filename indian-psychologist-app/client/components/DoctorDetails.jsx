import { Meteor } from 'meteor/meteor';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
// from react components
import 'rc-calendar/assets/index.css';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';

const timePickerElement = <TimePickerPanel
                            defaultValue={moment('00:00:00', 'HH:mm:ss')}
                            showSecond={false}
                            minuteStep={15}/>;

function onStandaloneSelect(value) {
    console.log('onStandaloneSelect');
    console.log(value && value.format("HH:mm:ss"));
}
function disabledTime(date) {
    console.log('disabledTime', date);
    if (date && (date.date() === 15)) {
        return {
            disabledHours() {
                return [3, 4];
            },
        };
    }
    return {
        disabledHours() {
            return [1, 2];
        },
    };
}
function disabledDate(current) {
    if (!current) {
        // allow empty select
        return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();  // can not select days before today
}
function getFormat(time) {
    return time ? format : 'YYYY-MM-DD';
}
const format = 'YYYY-MM-DD HH:mm:ss';


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
            disabled_submit: true
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
        console.log("handling change");
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
            disabled_submit: false
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
        console.log(Meteor.user());
        var user_profile = Meteor.user().profile;
        var hasPhone = user_profile.hasOwnProperty('phone_number') && user_profile.phone_number != '';
        var hasName = user_profile.hasOwnProperty('name') && user_profile.name != '';
        var hasEmail = user_profile.hasOwnProperty('email') && user_profile.email != '';
        if(hasPhone && hasName && hasEmail){
            console.log('Name and phonenumber and email are in profile');
        }
        else{
            //message if crude validation failed
            var notification = 'Please complete your profile first! ';
            !hasPhone ? notification += 'Your phone number is missing. ' : '';
            !hasName ? notification += 'Your name is missing. ' : '';
            !hasEmail ? notification += 'Your email is missing. ' : '';
            ons.notification.alert(notification);
            return;
        }

        if(this.state.disabled_submit === false) {
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
                    ONS.notification.toast('Appointment requested! Check your email!', {timeout: 6000});
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
                {/*<Calendar
                        showWeekNumber={true}
                        locale={enUS}
                        disabledTime={disabledTime}
                        disabledDate={disabledDate}
                        showToday
                        showOk={true}
                        timePicker={timePickerElement}
                        onChange={this.handleChange}
                        onSelect={onStandaloneSelect}
                        showDateInput={false}
                    />*/}
                    <div style={{ width: 300 }}>
                        <CalendarWrapper defaultValue={moment(this.state.date)} handleChange={this.handleChange}/>
                    </div>
                    {/*<DatePicker
                        selected={this.state.date}
                        onChange={this.handleChange}
                        filterDate={this.isAvailable}
                        placeholderText="Select a weekday"
                        showTimeSelect
                        excludeTimes={this.state.excluded}
                        dateFormat="LLL"
                        withPortal />*/}
                <Ons.Button modifier="large" onClick={this.onPressBookDoctor.bind(this)}>Request Doctor</Ons.Button>
			</Ons.Page>
		);	
	}
}



class CalendarWrapper extends React.Component {
    static propTypes = {
        defaultValue: PropTypes.object,
        defaultCalendarValue: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            showTime: true,
            showDateInput: true,
            disabled: false,
            value: '',
        };
    }

    onChange = (value) => {
        console.log('DatePicker change: ', (value));
        this.setState({
            value,
        });
    }

    render() {
        const state = this.state;
        const calendar = (<Calendar
            showWeekNumber={true}
            placeholder={'please input'}
            locale={enUS}
            defaultValue={this.state.date}
            disabledTime={disabledTime}
            disabledDate={disabledDate}
            showToday={false}
            showOk={true}
            timePicker={timePickerElement}
            onChange={this.props.handleChange}
            onSelect={onStandaloneSelect}
            showDateInput={false}
        />);
        return (<div style={{ width: 400, margin: 20 }}>
            <div style={{ marginBottom: 10 }}>
            </div>
            <div style={{
                boxSizing: 'border-box',
                position: 'relative',
                display: 'block',
                lineHeight: 1.5,
                marginBottom: 22,
            }}
            >
                <DatePicker
                    animation="slide-up"
                    disabled={state.disabled}
                    calendar={calendar}
                    value={state.value}
                    onChange={this.onChange}
                >
                    {
                        ({ value }) => {
                            return (
                                <span tabIndex="0">
                                    <input
                                        placeholder="please select"
                                        style={{ width: 250 }}
                                        disabled={state.disabled}
                                        readOnly
                                        tabIndex="-1"
                                        className="ant-calendar-picker-input ant-input"
                                        value={value && value.format(getFormat(state.showTime)) || ''}
                                    />
                                </span>
                                );
                            }
                    }
                </DatePicker>
            </div>
        </div>);
    }
}
