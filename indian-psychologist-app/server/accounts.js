import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    Meteor.Mailgun.config({
        username: 'postmaster@mail.shopwarp.com',
        password: '7f7308a9a0b95a90297098eba2e93413'
    });

    Meteor.Mailgun = {
        config: function(options){
            var protocol = "smtps";
            username = options['username'];
            password = options['password'];
            host = 'smtp.mailgun.org';
            port = '465';
            process.env.MAIL_URL = `${protocol}://${username}:${password}@${host}:${port}/`;
        },
        // a wrapper for Email just to be consistent.
        send: function(options){
            Email.send(options);
        }
    };

  ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    {
      $set: {
        appId: '2410035815888129',
        loginStyle: "popup",
        secret: '8a92a550c9364bcb784e36a1e1642c2d'
      }
    }
  );
});
