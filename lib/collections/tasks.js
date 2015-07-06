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
    deleteTask: function (taskId) {
        var task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
    },
    setChecked: function (taskId, setChecked) {
        var task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { checked: setChecked} });
    }
});