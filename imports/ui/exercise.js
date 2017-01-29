import { Template } from 'meteor/templating';

import { Exercises } from '../api/exercises.js';
import "./exercise.html"

Template.body.helpers({
    exercises() {
        return Exercises.find({})
    }
});