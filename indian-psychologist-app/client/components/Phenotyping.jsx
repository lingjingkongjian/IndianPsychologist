import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
//import 'onsenui/css/onsenui.css';
//import 'onsenui/css/onsen-css-components.css';
import './Phenotyping.css';

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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

const marks0 = {
    0: <strong>0</strong>,
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: <strong>10</strong>
  };

const marks1 = {
    0: <strong>0</strong>,
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13",
    14: "14",
    15: "15",
    16: "16",
    17: "17",
    18: "18",
    19: "19",
    20: <strong>20</strong>
  };

const marks2 = {
    0: <strong>0</strong>,
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: <strong>10</strong>
  };

const marks3 = {
    0: <strong>0</strong>,
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: <strong>12</strong>
  };

class Phenotyping extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            activePhenotype: '',
            medication_morning: props.phenotype_today[0] && (typeof (props.phenotype_today[0]['medication_morning']) == 'undefined') ?
                props.phenotypes.medication_morning : false,
            medication_afternoon: props.phenotype_today[0] && (typeof (props.phenotype_today[0]['medication_afternoon']) == 'undefined') ?
                props.phenotypes.medication_afternoon : false,
            medication_dinner: props.phenotype_today[0] && (typeof (props.phenotype_today[0]['medication_dinner']) == 'undefined') ?
                props.phenotypes.medication_dinner : false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    savePhenotype() {
        var update_obj = {
            //"date": moment().format("YYYY-MM-DD")
            "mood": this.state.mood,
            "physical_activity": this.state.physical_activity,
            "motivation": this.state.motivation,
            "sleep": this.state.sleep,
            "medication_morning": this.state.medication_morning,
            "medication_afternoon": this.state.medication_afternoon,
            "medication_dinner": this.state.medication_dinner,
        };
        // send email
        Meteor.call('updatePhenotyping', {
            userId: Meteor.userId(),
            update_obj: update_obj
        }, (err, res) => {
            if (err) {
                alert(err);
            } else {
                // success!
            }
        });

        ONS.notification.toast('Phenotyping added or updated!', {timeout: 2000});
    }

    onSelectDoctor(doctor) {
        this.props.navigator.pushPage({
            'component': DoctorDetails,
            'props': {
                activeReport: doctor,

            }
        }, {animation: 'slide'});
    }

    handleChange(event) {
        console.log(event);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.type === 'checkbox' ? target.id : target.name;

        this.setState({
            [name]: value
        });
    }

    handleSliderChange(value, name, event) {
        console.log(event);

        this.setState({
            [name]: value
        });
    }

    render() {

        return (
            <Ons.Page>
                <h3 style={{padding:"15px"}}>{moment().format("dddd D MMMM YYYY")}</h3>
                <div className='pheno_box'>
                    <div>Daily Mood</div>
                    <div style={{padding: "30px"}}>
                        <Slider
                            min={0}
                            max={10}
                            marks={marks0}
                            className={'mood'}
                            step={null} // or null
                            onChange={(value) => this.handleSliderChange(value, 'mood')}
                            value={this.state.mood}
                        />
                    </div>
                    <div>Value: {this.state.mood}</div>
                </div>
                <div className='pheno_box' onChange={(e) => e.stopPropgation()}>
                    <div>Physical Activity (0 to 20+ hours)</div>
                    <div style={{padding: "30px"}}>
                        <Slider
                            min={0}
                            max={20}
                            marks={marks1}
                            className={'physical_activity'}
                            step={null} // or null
                            onChange={(value) => this.handleSliderChange(value, 'physical_activity')}
                            value={this.state.physical_activity}
                        />
                    </div>
                    <div>Value: {this.state.physical_activity} hours</div>
                </div>
                <div className='pheno_box'>
                    <div>Motivation</div>
                    <div style={{padding: "30px"}}>
                        <Slider
                            min={0}
                            max={10}
                            marks={marks2}
                            className={'motivation'}
                            step={null} // or null
                            onChange={(value) => this.handleSliderChange(value, 'motivation')}
                            value={this.state.motivation}
                        />
                    </div>
                    <div>Value: {this.state.motivation}</div>
                </div>
                <div className='pheno_box'>
                    <div>Sleep (0 to 12+ hours)</div>
                    <div style={{padding: "30px"}}>
                        <Slider
                            min={0}
                            max={12}
                            marks={marks3}
                            className={'sleep'}
                            step={null} // or null
                            onChange={(value) => this.handleSliderChange(value, 'sleep')}
                            value={this.state.sleep}
                        />
                    </div>
                    <div>Value: {this.state.sleep} hours</div>
                </div>
                <div className='pheno_box_medication'>
                    <div>Medication taken in</div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Morning</td>
                                <td>
                                    <Ons.Checkbox
                                        inputId={`medication_morning`}
                                        onChange={this.handleChange}
                                        checked={this.state.medication_morning}
                                        />
                                </td>
                            </tr>
                            <tr>
                                <td>Afternoon</td>
                                <td>
                                    <Ons.Checkbox
                                        inputId={`medication_afternoon`}
                                        onChange={this.handleChange}
                                        checked={this.state.medication_afternoon}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Dinner/Evening</td>
                                <td>
                                    <Ons.Checkbox
                                        inputId={`medication_dinner`}
                                        onChange={this.handleChange}
                                        checked={this.state.medication_dinner}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Ons.Button style={{margin: 10}} onClick={this.savePhenotype.bind(this)}> Save </Ons.Button><br/>
                <div style={{padding: "10px"}}>Previous days</div>
                <Ons.List style={{marginBottom: "50px"}}>
                     {this.props.phenotypes.map(phenotype => {
                         var properties = [];
                         for (var property in phenotype) {
                             console.log(property);
                             if (phenotype.hasOwnProperty(property)) {
                                 // do stuff
                                 var isUndefined = typeof (phenotype[property]) == 'undefined';
                                 if (property != 'userId' && property != 'date' && property != '_id' && !isUndefined) {
                                     console.log(phenotype[property]);
                                     properties.push(<div key={property}>{property}: {phenotype[property].toString()}</div>);
                                 }
                             }
                         }
                         properties.sort();
                         // console.log(phenotype);
                        return (
                            <Ons.ListItem key={phenotype._id} tappable onClick={
                                () => { phenotype._id == this.state.activePhenotype ? this.setState({activePhenotype: ""}):
                                    this.setState({activePhenotype: phenotype._id})}}>
                            <span className="list-item__title">
                                Date: {phenotype.date}
                            </span>
                            <span style={expandedStyle} className="list-item__subtitle">
                                {phenotype._id == this.state.activePhenotype ? properties : ''}
                            </span>
                            </Ons.ListItem>
                            );
                        })
                    }
                </Ons.List>
            </Ons.Page>
        );
    }
}

export default PhenotypingContainer = withTracker(props => {
    var userId = Meteor.user()._id;
    var phenotypes = PhenotypingCollection.find({'userId': userId}).fetch();
    var phenotype_today = PhenotypingCollection.find({'userId': userId, 'date': moment().format("YYYY-MM-DD")}).fetch();
    console.log(phenotypes);
    return {
        phenotypes: phenotypes,
        phenotype_today: phenotype_today,
        user: Meteor.user()
    };
})(Phenotyping);
