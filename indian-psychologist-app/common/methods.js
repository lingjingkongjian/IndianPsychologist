import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'sendMail'({ status, userId, doctorId, appointment_id }) {
        new SimpleSchema({
            status: { type: Number },
            userId: { type: String },
            doctorId: { type: String },
            appointment_id: { type: String }
        }).validate({ status, userId, doctorId, appointment_id });

        const user = Users.findOne({_id: userId});
        const doctor = Users.findOne({_id: doctorId});

        const email_text0 = 'Dear '+user.profile.name+',<br/>' +
            '<br/>' +
            'Thank you for requesting an appointment with '+doctor.profile.name+': <br/>' +
            'Further steps: <br/>' +
            '1. Your request is sent to the psychologist (completed)<br/>' +
            '2. He/she confirms or rejects your time-slot within 24h<br/>' +
            '3. After each session you will receive a short summary in "Diagnoses"<br/>' +
            'We will provide confirmation emails and reminders.<br/><br/>'+
            'Best wishes from the team of Outreach App.';

        const email_text1 = 'Dear '+user.profile.name+',<br/>' +
            '<br/>' +
            'Your appointment with '+doctor.profile.name+' is now confirmed.<br/>' +
            '<br/>' +
            'After each session you will get a short summary in "Diagnoses"<br/>' +
            'Best wishes from the team of Outreach App.';

        const email_text2 = 'Dear '+user.profile.name+',<br/>' +
            '<br/>' +
            'Your appointment with '+doctor.profile.name+' was canceled<br/>' +
            'Please contact our customer service as soon as possible to reschedule.<br/><br/>'+
            'Best wishes from the team of Outreach App.';

        const email_text3 = 'Dear '+user.profile.name+',<br/>' +
            '<br/>' +
            'Your appointment with '+doctor.profile.name+' is finished<br/>' +
            'You will receive a short summary in "Diagnoses" soon.<br/>'+
            'Best wishes from the team of Outreach App.';

        const doc0 = 'The appointment with '+user.profile.name+' was canceled. Customer service will contact you shortly.';
        const doc3 =  'You have a new booking. Please check your appointments.';

        let email_text = "";
        let doc_text = "";
        let doc = false;
        switch(status) {
            case 0:
                email_text = email_text0;
                doc_text = doc0;
                break;
            case 1:
                email_text = email_text1;
                break;
            case 2:
                email_text = email_text2;
                break;
            case 3:
                email_text = email_text3;
                doc_text = doc3;
                break;
            default:
                email_text = email_text0;
        }
        Meteor.Mailgun.send({
            to: user.profile.email,
            from: 'jon@shopwarp.com',
            subject: 'A subject',
            text: 'This is the text to the user (booking)',
            html: email_text
        });

        if(doc) {
            Meteor.Mailgun.send({
                to: doctor.profile.email,
                from: 'jon@shopwarp.com',
                subject: 'A subject',
                text: 'This is the text to the doctor',
                html: doc_text
            });
        }
    },
    'updatePhenotyping'({userId, update_obj}){
        PhenotypingCollection.upsert(
            {
                date: moment().format("YYYY-MM-DD"),
                userId: userId
            },
            {
                //Modifier
                $set: update_obj
            });
    }
});