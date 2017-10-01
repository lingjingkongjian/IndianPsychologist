import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


class Welcome extends React.Component {
	render() {
		return (
			<Ons.Page>
				<p>Welcome!!</p>
			</Ons.Page>
		);
	}
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, Welcome);

