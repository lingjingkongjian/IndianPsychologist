import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Welcome from './Welcome.jsx';
import keyboardJS from 'keyboardjs';

import './Profile.css';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.profile.name,
            age: this.props.user.profile.age,
            location: this.props.user.profile.location,
            email: this.props.user.profile.email,
            phone_number: this.props.user.profile.phone_number,
            isDoctor: this.props.user.profile.isDoctor,
            specialities: this.props.user.profile.specialities,
            additionalInfo: this.props.user.profile.additionalInfo,
            showSwitchDoctor: false,
        };
        this.switchDoc = this.switchDoc.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    switchDoc(value){
        this.setState({
            showSwitchDoctor: value
        });
    }

    componentDidMount() {
        keyboardJS.bind('d', (e) => {
            e.preventRepeat();
            this.switchDoc(true);
        }, (e) => {
            this.switchDoc(false);
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    logout() {
        Meteor.logout();
        //alert("opening welcome screen");
        /*setTimeout(function(){
            Session.set({'welcomeScreenShowed': true});
            that.props.navigator.pushPage({component: WelcomeContainer}, {animation: 'simpleslide'});
        }, 300);*/
    }

    saveProfile() {
        Meteor.users.update({_id: Meteor.userId()},
            {$set:
                    {
                        "profile.name": this.state.name,
                        "profile.age": this.state.age,
                        "profile.location": this.state.location,
                        "profile.email": this.state.email,
                        "profile.phone_number": this.state.phone_number,
                        "profile.isDoctor": this.state.isDoctor,
                        "profile.specialities": this.state.specialities,
                        "profile.additionalInfo": this.state.additionalInfo,
                    }
            });
        ONS.notification.toast('Settings updated!', {timeout: 2000});
    }

    render() {
        return (
            <Ons.Page contentStyle={{padding: 20}}>
                <Ons.Card contentStyle={{textAlign: 'center'}}>
                    <form className="update-profile">
                        <div>Note: accounts can only be transformed on a desktop computer.</div>
                        <div>Please contact support for exact instructions.</div>
                        <table>
                            <tbody>
                            {(() => {
                                    return (
                                        <tr>
                                            <td><label>is doctor</label></td>
                                            <td><input
                                                    type="checkbox"
                                                    name="isDoctor"
                                                    disabled={(this.state.showSwitchDoctor == false)? true : false}
                                                    checked={this.state.isDoctor} onChange={this.handleChange.bind()}
                                                    style={{margin: "5px"}}
                                            />
                                            </td>
                                        </tr>
                                    )
                            })()}
                            </tbody>
                        </table>
                    </form><br/>
                    <Ons.Button style={{margin: 10}} onClick={this.saveProfile.bind(this)}> Save </Ons.Button><br/>
                    <Ons.Button style={{margin: 10}} onClick={this.logout.bind(this)}> Logout </Ons.Button>
                </Ons.Card>
            </Ons.Page>
        );
    }
}


export default SettingsContainer = withTracker(props => { ///not implemented in the right place
    return {
        user: Meteor.user(),
    };
})(Settings);


