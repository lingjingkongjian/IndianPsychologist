import {
  Meteor
} from 'meteor/meteor';
const settings = require('../settings.json');

Meteor.startup(() => {

  Meteor.Mailgun.config({
    username: settings.mailgun.username,
    password: settings.mailgun.password
  });

  Meteor.Mailgun = {
    config: function (options) {
      var protocol = "smtps";
      username = options['username'];
      password = options['password'];
      host = 'smtp.mailgun.org';
      port = '465';
      process.env.MAIL_URL = `${protocol}://${username}:${password}@${host}:${port}/`;
    },
    // a wrapper for Email just to be consistent.
    send: function (options) {
      Email.send(options);
    }
  };

  ServiceConfiguration.configurations.upsert({
    service: "facebook"
  }, {
    $set: {
      appId: settings.facebook.appId,
      loginStyle: settings.facebook.loginStyle,
      secret: settings.facebook.secret
    }
  });
});