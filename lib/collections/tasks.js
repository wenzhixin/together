Tasks = new Mongo.Collection('tasks');

Meteor.methods({
    addTask: function (task) {
        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            category: task.category,
            text: task.text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
            together: task.together
        });
    },
    updateTask: function (id, task) {
        Tasks.update(id, {$set: task});
    },
    deleteTask: function (id) {
        Tasks.remove(id);
    }
});