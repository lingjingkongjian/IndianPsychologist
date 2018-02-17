import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const divStyle = {
    width: "300px",
    overflow:"hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
}

const expandedStyle = {whiteSpace: "pre-line"}

const textarea_style = {
    width: "100%",
    marginBottom: "20px",
}

class Diagnoses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeReport: ''
        }
    }

    onSelectDoctor(doctor) {
        this.props.navigator.pushPage({
            'component': DoctorDetails,
            'props': {
                activeReport: doctor,

            }
        }, {animation: 'slide'});
    }

    render() {
        var reportsList = this.props.reports;

        reportsList = reportsList.map(report => {
            return (
				<Ons.ListItem key={report._id} tappable onClick={
				    () => { report._id == this.state.activeReport ? this.setState({activeReport: ""}):
                        this.setState({activeReport: report._id})}}>
                    <span className="list-item__title">
                        { this.props.isDoctor ?
                            <span>Patient: {report.user.profile.name} </span>
                            :
                            <span>Doctor: {report.doctor.profile.name} </span>
                        }
                        - Date: {report.appointment_data.date}
                    </span>
                    { report._id == this.state.activeReport ?
                        <span style={expandedStyle} className="list-item__subtitle">
                            <br/>
                            {report.message}
                            <br/>
                            <br/>
                            Written: {report.createdAt.toString()}
                        </span>
                        :
                        <span style={divStyle} className="list-item__subtitle">
                            {report.message}
                        </span>
                    }

				</Ons.ListItem>
            );
        });
        return (
			<Ons.Page>

				<Ons.List>
                    {reportsList}
				</Ons.List>
			</Ons.Page>
        );
    }
}

export default DiagnosesContainer = withTracker(props => {
	var userId = Meteor.user()._id;
	var isDoctor = Meteor.user().profile.isDoctor;
	var reports = isDoctor ? ReportsCollection.find({'doctorId': userId}).fetch() : ReportsCollection.find({'userId': userId}).fetch();
	console.log(reports);
    return {
        isDoctor: isDoctor,
        reports: reports,
        user: Meteor.user()
    };
})(Diagnoses);
