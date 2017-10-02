import { Meteor } from 'meteor/meteor';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Search from './Search.jsx';
import Profile from './Profile.jsx';
import Appointments from './Appointments.jsx';
import Diagnoses from './Diagnoses.jsx';

export default class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			contentComponent: <Search navigator={this.props.navigator}/>,
			contentTitle: 'Search',
		}
	}

	hide() {
		this.setState({isOpen: false});
	}

	show() {
		this.setState({isOpen: true});
	}

	renderToolbar() {
		return (
			<Ons.Toolbar>
				<div className='left'>
					<Ons.ToolbarButton onClick={this.show.bind(this)}>
						<Ons.Icon icon='ion-navicon, material:md-menu' />
					</Ons.ToolbarButton>
				</div>
				<div className='center'>{this.state.contentTitle}</div>
			</Ons.Toolbar>
		);
	}

	gotoPage(e) {
		console.log(e.target);
	}

	render() {
		
		var sideMenuEntries = [
			{
				title: 'Search',
				component: <Search navigator={this.props.navigator}/>
			},
			{
				title: 'Appointments',
				component: <Appointments navigator={this.props.navigator}/>
			},
			{
				title: 'Diagnoses',
				component: <Diagnoses navigator={this.props.navigator}/>
			},
			{
				title: 'Profile',
				component: <Profile navigator={this.props.navigator}/>
			},
		];

		var sideMenuListItems = sideMenuEntries.map(entry => { return (
			<Ons.ListItem 
				tappable
				key={entry.title} 
				onClick={() => {
					this.setState({
						'contentComponent': entry.component,
						'contentTitle': entry.title,
						'isOpen': false,
					});
				}} 
			>
				{entry.title}
			</Ons.ListItem>
		)});
		
		if(this.state.selectedMenuPoint === 'Search') {
			var content = <Search />;
		} else if (this.state.selectedMenuPoint === 'Appointments') {
			var content = <Search />;
		} else if (this.state.selectedMenuPoint === 'Profile') {
			var content = <Profile />;
		}

		return (
			<Ons.Page>
				<Ons.Splitter>
			        <Ons.SplitterSide
						side='left'
						width={250}
						collapse={true}
						swipeable={true}
						isOpen={this.state.isOpen}
						onClose={this.hide.bind(this)}
						onOpen={this.show.bind(this)}
			        >
			          <Ons.Page>
			            <Ons.List>
			            	{sideMenuListItems}
			            </Ons.List>
			          </Ons.Page>
			        </Ons.SplitterSide>
					<Ons.SplitterContent>
						<Ons.Page renderToolbar={this.renderToolbar.bind(this)}>
							{this.state.contentComponent}
						</Ons.Page>
			        </Ons.SplitterContent>

				</Ons.Splitter>
			</Ons.Page>
		);
	}
}