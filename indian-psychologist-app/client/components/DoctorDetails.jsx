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

	render() {
		var doctor = this.props.doctor;
		return (
			<Ons.Page 
				renderToolbar={this.renderToolbar.bind(this)}
				contentStyle={{backgroundColor: '#eee', height: 200, padding: '1px 0 0 0'}}
			>
					<div className="card">
						<h2 className="card__title">{doctor.username}</h2>
						<div className="card__content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
					</div>
			</Ons.Page>
		);	
	}
}

