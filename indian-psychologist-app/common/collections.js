Users = Meteor.users;

AppointmentsCollection = new Mongo.Collection('appointments', {
	transform: function(doc) {
		var doctor = Users.findOne(doc.doctorId);
        doc.doctor = doctor;
        var user = Users.findOne(doc.userId);
		doc.user = user;
		return doc;
	}
});

ReportsCollection = new Mongo.Collection('reports', {
    transform: function(doc) {
        var doctor = Users.findOne(doc.doctorId);
        doc.doctor = doctor;
        var user = Users.findOne(doc.userId);
        doc.user = user;
        var appointment = AppointmentsCollection.findOne(doc.appointmentId); ///this gives us duplicate data for user and for doctor
        doc.appointment_data = appointment;
        return doc;
    }
});
