import { Meteor } from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import SideMenuContainer from './SideMenu.jsx';

export default class Navigator extends React.Component {

  constructor(props) {
      super(props);
      this.state = { ///this isn't working
          contentComponent: <SearchContainer navigator={this.props.navigator}/>,
      }
      this.changeContext = this.changeContext.bind(this);
  }

  changeContext(component){
      this.setState({
          'contentComponent': entry.component,
          'contentTitle': entry.title,
          'isOpen': false,
      });
  }

  renderPage(route, navigator) {
    console.log(route);
    const props = route.props || {};
    props.navigator = navigator;
    props.contentComponent = this.state.contentComponent;
    props.changeContext = this.changeContext;
    props.key = props._id || Random.id();
    return React.createElement(route.component, props);
  }

  render() {
    return (
      <Ons.Navigator swipeable
        initialRoute={{component: SideMenuContainer}}
        renderPage={this.renderPage.bind(this)}
      />
    );
  }
}
