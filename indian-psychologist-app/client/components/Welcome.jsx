import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class FacebookLogin extends React.Component {

	loginWithFacebook() {
		var that = this;
		Meteor.loginWithFacebook({
				requestPermissions: ['email']
			}, (err) => {
			if (err) {
				// handle error
			} else {
				ons.notification.toast('Logged in successfully', {timeout: 2000});
				Session.set({'welcomeScreenShowed': false});
				that.props.navigator.popPage();
			}
		});
	}

	render() {
		return (
			<Ons.Button onClick={this.loginWithFacebook.bind(this)}> Login With Facebook </Ons.Button>
		); 
	}
}


class Welcome extends React.Component {
	render() {
		return (
			<Ons.Page>
				<div style={{textAlign: 'center'}}>
					<br />
					<br />
					<h2>Welcome to the Indian Doctor App </h2>
					<p> lorem ipsum sit dolor amet... </p>
					<br />
					<br />
					<FacebookLogin navigator={this.props.navigator} />
				</div>
			</Ons.Page>
		);
	}
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, Welcome);

