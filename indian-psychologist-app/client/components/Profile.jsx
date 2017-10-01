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

import Welcome from './Welcome.jsx';

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
    Session.set({'welcomeScreenShowed': true});
    this.props.navigator.pushPage({component: Welcome}, {animation: 'lift'});
  }
	render() {
		return (
      <Ons.Page contentStyle={{padding: 20}}>
        <Ons.Card contentStyle={{textAlign: 'center'}}>
          <Avatar user={this.props.user} />
          <h2>{this.props.user.profile.name}</h2>
          <Ons.Button onClick={this.logout.bind(this)}> Logout </Ons.Button>
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

 
