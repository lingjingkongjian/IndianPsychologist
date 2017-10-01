import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			'searchInput': '',
		}
	}

	render() {
		var doctorsList = this.props.doctors.map(doctor => {
			return (
				<Ons.ListItem key={doctor._id} tappable>
					<div className='left'>
						<img src={doctor.profile.public.avatar} className='list-item__thumbnail' />
					</div>
			        <span className="list-item__title">{doctor.username}, {doctor.profile.public.age}</span>
			        <span className="list-item__subtitle"> {doctor.profile.public.additionalInfo}</span>
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
		doctors: Users.find({'profile.public.isDoctor': true}).fetch(),
	};
}, Search);
