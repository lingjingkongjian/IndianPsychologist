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

class Avatar extends React.Component {

  onEditAvatar() {
    var that = this;
    MeteorCameraUI.getPicture({/*width: 400, height: 400,*/ quality:100}, function(error, data) {
      if(error) console.log(error);
      var options = {
        apiKey: 'a6e3380b07014ef',
        image: data
      };
      Imgur.upload(options, function(error, data){
        if(error) console.log(error);
        console.log(data);
        that.setState({'imageData': data});
        Users.update({'_id': Meteor.userId()}, {$set: {'profile.avatar': data.link}})
      });
    });
  }

  render() {
    if(!this.props.user.profile.avatar) {
      var avatar = <Ons.Icon size={200} icon="ion-person" />;
    } else {
      var avatar = <img style={{/*maxHeight: 150*/ height: "150px"}} src={this.props.user.profile.avatar} alt=""/>
    }
    return (
      <div style={{textAlign: 'center'}}>
        {avatar} <br />
        <Ons.Button modifier="quiet" onClick={this.onEditAvatar.bind(this)}> Edit Avatar </Ons.Button>
      </div>
    );
  }

}

class Profile extends React.Component {
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
        keyboardJS.bind('a + b', (e) => {
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
        ONS.notification.toast('Profile updated!', {timeout: 2000});
    }

	render() {
		return (
      <Ons.Page contentStyle={{padding: 20}}>
        <Ons.Card contentStyle={{textAlign: 'center'}}>
          <Avatar user={this.props.user} />
            <form className="update-profile">
                <table>
                    <tbody>
                        <tr>
                            <td><label>Name</label></td>
                            <td><input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind()} /></td>
                        </tr>
                        <tr>
                            <td><label>Age</label></td>
                            <td><input type="text" name="age" value={this.state.age} onChange={this.handleChange.bind()} /><br/></td>
                        </tr>
                        <tr>
                            <td><label>City</label></td>
                            <td><input type="text" name="location" value={this.state.location} onChange={this.handleChange.bind()} /><br/></td>
                        </tr>
                        <tr>
                            <td><label>Email</label></td>
                            <td><input type="text" name="email" value={this.state.email} onChange={this.handleChange.bind()} /><br/></td>
                        </tr>
                        <tr>
                            <td><label>Phone number</label></td>
                            <td><input type="text" name="phone_number" value={this.state.phone_number} onChange={this.handleChange.bind()} /><br/></td>
                        </tr>
                        {(() => {
                            if (this.state.isDoctor) {
                                return (
                                    <tr>
                                        <td><label>Specialities</label></td>
                                        <td><input type="text" name="specialities" value={this.state.specialities} onChange={this.handleChange.bind()} /><br/></td>
                                    </tr>
                                    )
                            }
                        })()}
                        {(() => {
                            if (this.state.isDoctor) {
                                return (
                                    <tr>
                                        <td><label>Additional Information</label></td>
                                        <td><input type="text" name="additionalInfo" value={this.state.additionalInfo} onChange={this.handleChange.bind()} /><br/></td>
                                    </tr>
                                )
                            }
                        })()}
                    </tbody>
                </table>
            </form><br/>
            <Ons.Button style={{margin: 10}} onClick={this.saveProfile.bind(this)}> Save </Ons.Button><br/>
        </Ons.Card>
      </Ons.Page>
		);
	}
}


export default ProfileContainer = withTracker(props => { ///not implemented in the right place
    return {
        user: Meteor.user(),
    };
})(Profile);

 
