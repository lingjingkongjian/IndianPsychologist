
Meteor.publish("userStatus", function() {
  return Users.find({ "status.online": true }, { fields: { 'status': 1 } });
});

Meteor.publish("appointments", function() {
    return AppointmentsCollection.find({ });
});

