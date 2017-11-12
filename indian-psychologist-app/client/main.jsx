import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Navigator from './components/Navigator.jsx';

ONS = ons;

Meteor.startup(() => {
    initTuktuk();
    render(<Navigator />, document.getElementById('render-target'));
  });

function initTuktuk(){
  var url = new URL(document.location.href);
  var platform = url.searchParams.get('platform');
  ons.platform.select(platform);
  function KeyPress(e) {
    var evtobj = window.event ? event : e;
    if (evtobj.keyCode == 84 && evtobj.ctrlKey) window.open('http://lucnaterop.github.io/onsen-tuktuk');
  }

  // Strg M to open Mongol, Strg t to open tuktuk
  document.onkeydown = KeyPress;
}