import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Exercises = new Mongo.Collection('exercises');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('exercises', function exercisesPublication() {
        return Exercises.find({ owner: this.userId });
    });
}

Meteor.methods({
    'exercises.insert' (name) {
        check(name, String);

        // Make sure the user is logged in before inserting an exercise
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Exercises.insert({
            name,
            createdAt: new Date(),
            owner: this.userId
        });
    },
    'exercises.remove' (exerciseId) {
        check(exerciseId, String);

        Tasks.remove(exerciseId);
    },
    'exercises.update' (exerciseId, name) {
        check(exerciseId, String);
        check(name, string);

        Tasks.update(exerciseId, { $set: { name: name } });
    },
});