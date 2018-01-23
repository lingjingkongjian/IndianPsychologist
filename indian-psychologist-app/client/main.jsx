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
    registerSW();
    initTuktuk();
    render(<Navigator />, document.getElementById('render-target'));
    if (Meteor.isCordova) {
      cordova.plugins.diagnostic.isCameraAuthorized(
            authorized => {
                if (!authorized) {
                  cordova.plugins.diagnostic.requestCameraAuthorization(
                        granted => {
                            console.log( "Authorization request for camera use was " +
                                (granted ? "granted" : "denied"));
                            },
                        error => { console.error(error); }
                    );
                }
            },
            error => { console.error(error); }
        );
    }
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

function registerSW(){
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}