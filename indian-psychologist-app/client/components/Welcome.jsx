import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import ReactDOM from 'react-dom';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import { Accounts } from 'meteor/std:accounts-ui';

const divStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "600px",
};
const divStyle_text = {
    float: "left",
    width: "350px",
    marginRight: "20px",
};
const divStyle_login = {
    float: "left",
    width: "230px",
};
const divStyle_img = {
    textAlign: "center",
    margin: "20px auto",
    display: "block",
};

class Welcome extends React.Component {

    render() {
        return (
			<Ons.Page contentStyle={{padding: 20}}>
				<br />
				<br />
				<h2 style={{textAlign: 'center'}}>Welcome to Outreach </h2>
                <img style={divStyle_img} src="/img/logo.jpg"></img>
                <div style={divStyle}>
                    <div style={divStyle_text}>
                        <p>“Happiness doubles by sharing, and sadness halves. Outreach helps you share without leaving your comfort zone.”</p>

                        <p>Outreach Foundation believes in providing the best possible treatment and crisis resolution to you, at your own convenience and through our expertise with a promise of complete privacy and confidentiality.</p>

                        <p>Our list of dedicated Outreach Foundation Psychologists and top external psychologists have been carefully vetted for experience. Simply register, browse for psychologists, book your preferred day, receive a confirmation and begin chatting.</p>
                    </div>
                    <div style={divStyle_login}>
                        {<Accounts.ui.LoginForm />}
                    </div>
                </div>
			</Ons.Page>
        );
    }
}

export default WelcomeContainer = withTracker(props => {
    Accounts.ui.config({
        passwordSignupFields: 'EMAIL_ONLY',
        loginPath: '/login',
        onSignedInHook: () => {/* remove the login popup */ props.reset(); //alert("signed in");
            if(Meteor.user().profile.age == undefined) { ///i.e. profile fields are missing which happens after fb signup
                Users.update({'_id': Meteor.userId()},
                    {$set:
                        {
                            'profile.status': "123",
                            'profile.isDoctor': false,
                            'profile.avatar': 'https://i.imgur.com/8n9gXqY.jpg',
                            'profile.age': 28,
                            'profile.location': 'Mumbai',
                            'profile.email': '',
                            'profile.specialities': 'Specialty 1, Specialty 2',
                            'profile.additionalInfo': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                        }
                    });
                }
        },
        onPostSignUpHook: () => {
            /* remove the login popup */ document.querySelector('ons-navigator').popPage();
            /* modify the created user account */
            //alert("updated profile");
            let id = Meteor.userId();
            Users.update({'_id': id},
                {$set:
                    {
                    'profile.status': "",
                    'profile.name': '',
                    'profile.isDoctor': false,
                    'profile.avatar': 'https://i.imgur.com/8n9gXqY.jpg',
                    'profile.age': 28,
                    'profile.location': 'Mumbai',
                    'profile.email': Meteor.user().emails[0].address,
                    'profile.specialities': 'Specialty 1, Specialty 2',
                    'profile.additionalInfo': 'Additional Information'
                    }
                });
            },
        onSignedOutHook: () => {/*("logged out")*/}
    });

    return {
        user: Meteor.user()
    };
})(Welcome);

