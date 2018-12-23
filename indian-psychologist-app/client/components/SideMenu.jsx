import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import SearchContainer from './Search.jsx';
import ProfileContainer from './Profile.jsx';
import AppointmentsContainer from './Appointments.jsx';
import DiagnosesContainer from './Diagnoses.jsx';
import PhenotypingContainer from './Phenotyping.jsx';
import SettingsContainer from './Settings.jsx';
import WelcomeContainer from './Welcome.jsx';

export class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			contentComponent: <SearchContainer navigator={this.props.navigator}/>,
			contentTitle: 'Search',
			navigator: document.querySelector('ons-navigator'),
		}
		this.resetContentComponent = this.resetContentComponent.bind(this);
	}

	resetContentComponent(){
		//alert("reset");
		this.setState({contentComponent: <SearchContainer navigator={this.props.navigator}/>});
	}

    componentDidMount() {
        // check if we have to show hello scre£en
        //that = this;
        //var myNavigator = document.querySelector('ons-navigator');

        /*console.log(Meteor.user());
        if(Meteor.user() == null){ //
			console.log("???");
            //alert("opening welcome screen");
            setTimeout(function(){
                if(that.props.user) return;
                //Session.set({'welcomeScreenShowed': true});
                that.props.navigator.pushPage({component: WelcomeContainer}, {animation: 'simpleslide'},
                    {props: {navigator: myNavigator}});
            }, 300)
        }*/
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
				component: <SearchContainer navigator={this.props.navigator}/>
			},
            {
                title: 'My day',
                component: <PhenotypingContainer navigator={this.props.navigator}/>
            },
			{
				title: 'Appointments',
				component: <AppointmentsContainer navigator={this.props.navigator}/>
			},
			{
				title: 'Diagnoses',
				component: <DiagnosesContainer navigator={this.props.navigator}/>
			},
			{
				title: 'Profile',
				component: <ProfileContainer navigator={this.props.navigator}/>
			},{
                title: 'Settings',
                component: <SettingsContainer navigator={this.props.navigator}/>
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
			var content = <SearchContainer navigator={this.props.navigator}/>;
		} else if (this.state.selectedMenuPoint === 'Appointments') {
			var content = <SearchContainer navigator={this.props.navigator}/>;
		} else if (this.state.selectedMenuPoint === 'Profile') {
			var content = <ProfileContainer navigator={this.props.navigator}/>;
		}

		return (
			<Ons.Page>
                {(() => {
                    if (this.props.user == null) {
                        return (
							<WelcomeContainer navigator={this.state.navigator} reset={this.resetContentComponent}></WelcomeContainer>
                        )
                    }
                    else {
                    	return (
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
						)
					}
                })()}
			</Ons.Page>
		);
	}
}

export default SideMenuContainer = withTracker(props => {
    return {
        user: Meteor.user() //null if not logged in, otherwise user id
    };
})(SideMenu);