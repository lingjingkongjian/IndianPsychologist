import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './Phenotyping.css';

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


class Phenotyping extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePhenotype: '',
            medication_morning: (typeof (props.phenotype_today[0]['medication_morning']) == 'undefined') ?
                props.phenotypes.medication_morning : false,
            medication_afternoon: (typeof (props.phenotype_today[0]['medication_afternoon']) == 'undefined') ?
                props.phenotypes.medication_afternoon : false,
            medication_dinner: (typeof (props.phenotype_today[0]['medication_dinner']) == 'undefined') ?
                props.phenotypes.medication_dinner : false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    savePhenotype() {
        update_obj = {
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
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.type === 'checkbox' ? target.id : target.name;

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
                    <span>1</span>
                        <Ons.Range
                            onChange={this.handleChange}
                            value={this.state.mood}
                            name={'mood'}
                            min={1}
                            max={10}
                        />
                    <span>10</span>
                    <div>Value: {this.state.mood}</div>
                </div>
                <div className='pheno_box'>
                    <div>Physical Activity (0 to 20+ hours)</div>
                    <span>0</span>
                    <Ons.Range
                        onChange={this.handleChange}
                        value={this.state.physical_activity}
                        name={'physical_activity'}
                        min={0}
                        max={20}
                    />
                    <span>20+</span>
                    <div>Value: {this.state.physical_activity} hours</div>
                </div>
                <div className='pheno_box'>
                    <div>Motivation</div>
                    <span>1</span>
                    <Ons.Range
                        onChange={this.handleChange}
                        value={this.state.motivation}
                        name={'motivation'}
                        min={1}
                        max={10}
                    />
                    <span>10</span>
                    <div>Value: {this.state.motivation}</div>
                </div>
                <div className='pheno_box'>
                    <div>Sleep (0 to 12+ hours)</div>
                    <span>1</span>
                    <Ons.Range
                        material
                        onChange={this.handleChange}
                        value={this.state.sleep}
                        name={'sleep'}
                        min={0}
                        max={12}
                    />
                    <span>12+</span>
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
                         properties = [];
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
                        console.log(phenotype);
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
