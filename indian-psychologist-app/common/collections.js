Users = Meteor.users;

AppointmentsCollection = new Mongo.Collection('appointments', {
	transform: function(doc) {
		var doctor = Users.findOne(doc.doctorId);
		doc.doctor = doctor;
		return doc;
	}
});
