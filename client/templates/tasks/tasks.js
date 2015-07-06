Template.tasks.helpers({
    tasks: function () {
        var params = {};

        if (!Meteor.userId()) {
            return [];
        }

        if (Session.get('hideCompleted')) {
            params = {checked: {$ne: true}};
        }
        return Tasks.find(params, {sort: {createdAt: -1}});
    }
});