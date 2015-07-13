Meteor.publish('tasks', function () {

    return Tasks.find({
        $or: [{}, {
            checked: {$ne: true}
        }]});
});
