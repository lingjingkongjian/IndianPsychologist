import Meteor from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

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



export default class Profile extends React.Component {

	render() {
		return (
      <Ons.Page contentStyle={{padding: 20}}>
        <h2>My Profile</h2>
        <AccountsUIWrapper />
      </Ons.Page>
		);
	}
}

 
