import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import ReactDOM from 'react-dom';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import { Accounts } from 'meteor/std:accounts-ui';

class Welcome extends React.Component {

    render() {
        const divStyle = {
            marginLeft: "auto",
            marginRight: "auto",
            width: "250px",
        }

        return (
			<Ons.Page contentStyle={{padding: 20}}>
				<br />
				<br />
				<h2 style={{textAlign: 'center'}}>Welcome to Outreach </h2>
                <h3 style={{textAlign: 'center'}}> Your personal psychologist </h3>
				<br />
				<br />
				<div style={divStyle}>
                    <Accounts.ui.LoginForm />
				</div>
				<br />
			</Ons.Page>
        );
    }
}

export default WelcomeContainer = withTracker(props => {

    Accounts.ui.config({
        passwordSignupFields: 'EMAIL_ONLY',
        loginPath: '/login',
        onSignedInHook: () => {/* remove the login popup */ document.querySelector('ons-navigator').popPage();},
        onSignedOutHook: () => {alert("logged out")}
    });

    return {
        user: Meteor.user()
    };
})(Welcome);

