import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
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
