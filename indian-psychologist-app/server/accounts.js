import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    {
      $set: {
        appId: '1896694213991612',
        loginStyle: "popup",
        secret: '3f10910f6cdcca70176a5de573168d80'
      }
    }
  );
});
