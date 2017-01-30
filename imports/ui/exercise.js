import { Template } from 'meteor/templating';

import { Exercises } from '../api/exercises.js';
import "./exercise.html"

Template.body.onCreated(function bodyOnCreated() {
    console.log("subscribing on exercises.")
    this.state = new ReactiveDict();
    Meteor.subscribe('exercises');
});

Template.body.helpers({
    exercises() {
        return Exercises.find({})
    }
});

Template.body.events({
    'submit .new-exercise' (event) {
        console.log("Event");
        console.log(event);
        event.preventDefault();

        const target = event.target;
        const name = target.name.value;

        Meteor.call('exercises.insert', name);

        target.name.value = '';
    },
    'click .delete' () {
        Meteor.call('exercises.delete', this._id);
    },
});