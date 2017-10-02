import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

export default class DoctorDetails extends React.Component {

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
		var specialitiesList = this.props.doctor.profile.specialities.map(speciality => <li><b>{speciality}</b></li>);
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
							<p>
								{doctor.profile.additionalInfo}
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
								tempor incididunt ut labore et dolore magna aliqua.
							</p>
							</div>
					</Ons.Card>
					<Ons.Button modifier="large">Book Doctor</Ons.Button>
			</Ons.Page>
		);	
	}
}

