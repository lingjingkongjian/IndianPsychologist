import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class Diagnoses extends React.Component {
	render() {
		return (
			<Ons.Page contentStyle={{padding: 20}}>
				<h2>My Diagnoses</h2>
			</Ons.Page>
		);	
	}
}

export default DiagnosesContainer = withTracker(props => {
    return {
        user: Meteor.user()
    };
})(Diagnoses);
