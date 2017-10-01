import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

export default class Appointments extends React.Component {
	render() {
		return (
			<Ons.Page contentStyle={{padding: 20}}>
				<h2>My Appointments</h2>
			</Ons.Page>
		);	
	}
}