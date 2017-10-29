import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';
import ReactDOM from 'react-dom';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

class AccountsUIWrapper extends React.Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}

class FacebookLogin extends React.Component {

	loginWithFacebook() {
		var that = this;
		Meteor.loginWithFacebook({
				requestPermissions: ['email']
			}, (err) => {
			if (err) {
				console.log(err)
			} else {
				ons.notification.toast('Logged in successfully', {timeout: 2000});
				Session.set({'welcomeScreenShowed': false});
				that.props.navigator.popPage();
			}
		});
	}

	render() {
		return (
			<Ons.Button modifier="large" onClick={this.loginWithFacebook.bind(this)}> Login With Facebook </Ons.Button>
		); 
	}
}


class Welcome extends React.Component {
	render() {
		return (
			<Ons.Page contentStyle={{padding: 20}}>
					<br />
					<br />
					<h2 style={{textAlign: 'center'}}>Welcome. </h2>
					<br />
					<FacebookLogin navigator={this.props.navigator} />
					<br />
					<br />
			</Ons.Page>
		);
	}
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, Welcome);

