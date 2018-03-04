import {Meteor} from "meteor/meteor";

Meteor.Mailgun.send({
    to: 'jonathanslehner@gmail.com',
    from: 'jon@shopwarp.com',
    subject: 'A subject',
    text: 'This is the text',
    html: 'With meteor its easy to set up <strong>HTML</strong> <span style="color:red">emails</span> too.'
});