import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import DoctorDetails from './DoctorDetails.jsx';

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			'searchInput': ''
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

	renderSearchBar() {
		var classes = 'search-input';
		if(ons.platform.isAndroid()) classes += ' search-input--material'
		return (
			<p style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10,}}>
				<input 
					type="search" 
					value={this.state.searchInput}
					placeholder="Search" 
					className={classes}
					style={{ width: '100%'}} 
					onChange={(e) => {this.setState({searchInput: e.target.value})}}
				/>
			</p>
		);
	}

	render() {
		var that = this;
		var doctorsList = this.props.doctors.filter(function(doctor) {
			if(doctor.profile.name.toLowerCase().indexOf(that.state.searchInput.toLowerCase()) > -1) return true;
			if(doctor.profile.additionalInfo.toLowerCase().indexOf(that.state.searchInput.toLowerCase()) > -1) return true;
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

				<Ons.List>
					{this.renderSearchBar()}
					{doctorsList}
				</Ons.List>
			</Ons.Page>
		);
	}
}

export default SearchContainer = withTracker(props => {
    return {
        doctors: Users.find({'profile.isDoctor': true}).fetch(),
        user: Meteor.user()
    };
})(Search);
