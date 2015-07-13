Template.tasks.onCreated = function () {
    Session.set('filter', 'all');
};

Template.tasks.helpers({
    tasks: function () {

        var date = new Date();

        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        var params = {createdAt: {$gte: date}};

        if (!Meteor.userId()) {
            return [];
        }

        if (Session.get('hideCompleted')) {
            params.checked = {$ne: true};
        }
        switch (Session.get('filter')) {
            case 'wen':
                params.username = 'wen';
                params.together = {$ne: true};
                break;
            case 'xiao':
                params.username = 'xiao';
                params.together = {$ne: true};
                break;
            case 'together':
                params.together = true;
                break;
            case 'completed':
                params = {checked: true};
                break;
        }

        return Tasks.find(params, {sort: {createdAt: -1}});
    }
});

Template.tasks.events({
    'change [name=filter]': function (e) {
        Session.set('filter', $(e.target).val());
    }
});