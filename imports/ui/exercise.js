import { Template } from 'meteor/templating';

import { Exercises } from '../api/exercises.js';
import "./exercise.html"

Template.body.helpers({
    exercises() {
        return Exercises.find({})
    }
});

Template.body.events({
    'submit .new-task' (event) {
        console.log("Event");
        console.log(event);
        event.preventDefault();

        const target = event.target;
        const name = target.name.value;

        Exercises.insert({
            name,
            createdAt: new Date(),
        });

        target.name.value = '';
    },
});