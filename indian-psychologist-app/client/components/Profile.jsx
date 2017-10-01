import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { createContainer } from 'meteor/react-meteor-data';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


class AccountsUIWrapper extends React.Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
  render() {
    return <span ref="container" />;
  }
}

class FacebookLogin extends React.Component {

  loginWithFacebook() {
    Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, (err) => {
      if (err) {
        // handle error
      } else {
        // successful login!
      }
    });
  }

  render() {
    return (
      <Ons.Button onClick={this.loginWithFacebook.bind(this)}> Login With Facebook </Ons.Button>
    ); 
  }
}

class Avatar extends React.Component {
  onEditAvatar() {
    console.log('oi')
  }
  render() {
    if(!this.props.user.profile.avatar) {
      var avatar = <Ons.Icon size={200} icon="ion-person" />;
    } else {
      var avatar = <img src={this.props.user.profile.public.avatar} alt=""/>
    }
    return (
      <div style={{textAlign: 'center'}}>
        {avatar} <br />
        <Ons.Button onClick={this.onEditAvatar.bind(this)}> Edit Avatar </Ons.Button>
      </div>
    );
  }
}

class Profile extends React.Component {
  logout() {
    Meteor.logout();
  }
	render() {
    if(this.props.user) {
      var logoutButton = <Ons.Button onClick={this.logout.bind(this)}> Logout </Ons.Button>
    } else {
      var loginButton = <FacebookLogin />
    }
		return (
      <Ons.Page contentStyle={{padding: 20}}>
        <Ons.Card contentStyle={{textAlign: 'center'}}>
          <Avatar user={this.props.user} />
          <h2>{this.props.user.profile.name}</h2>
          {logoutButton}
          {loginButton}
        </Ons.Card>
      </Ons.Page>
		);
	}
}


export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, Profile);

 
