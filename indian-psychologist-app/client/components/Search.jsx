import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Welcome from './Welcome.jsx';
import DoctorDetails from './DoctorDetails.jsx';


class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			'searchInput': '',
		}
	}

	componentDidMount() {
		// check if we have to show hello screen
		console.log('checking....');
		var that = this;
		if(!Session.get('welcomeScreenShowed')){
			setTimeout(function(){
				if(that.props.user) return;
				Session.set({'welcomeScreenShowed': true});
				that.props.navigator.pushPage({component: Welcome}, {animation: 'lift'});
			}, 2000)
		}
	}

	onSelectDoctor(doctor) {
		this.props.navigator.pushPage({
			'component': DoctorDetails,
			'props': {
				doctor: doctor
			}
		}, {animation: 'slide'});
	}

	render() {
		var that = this;
		var doctorsList = this.props.doctors.filter(function(doctor) {
			if(doctor.profile.name.indexOf(that.state.searchInput) > -1) return true;
			if(doctor.profile.additionalInfo.indexOf(that.state.searchInput) > -1) return true;
			return false;
		});

		doctorsList = doctorsList.map(doctor => {
			return (
				<Ons.ListItem key={doctor._id} tappable onClick={() => {this.onSelectDoctor(doctor)}}>
					<div className='left'>
						<img src={doctor.profile.avatar} className='list-item__thumbnail' />
					</div>
			        <span className="list-item__title">{doctor.profile.name}, {doctor.profile.age}</span>
			        <span className="list-item__subtitle"> {doctor.profile.additionalInfo}</span>
				</Ons.ListItem>
			);
		});
		return (
			<Ons.Page>
				<p style={{paddingLeft: 10, paddingRight: 10}}>
					<Ons.SearchInput
						style={{width: '100%'}}
						placeholder='Search' 
						onChange={(e) => {this.setState({searchInput: e.target.value})}}
					/>
				</p>
				<Ons.List>
					{doctorsList}
				</Ons.List>
			</Ons.Page>
		);
	}
}

export default createContainer(() => {
	return {
		doctors: Users.find({'profile.isDoctor': true}).fetch(),
		user: Meteor.user()
	};
}, Search);
