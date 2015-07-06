Meteor.publish('tasks', function () {
    var date = new Date();

    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    return Tasks.find({
        $or: [{
            createdAt: {$gte: date}
        }, {
            checked: {$ne: true}
        }]});
});
