Template.header.helpers({
    incompleteCount: function () {
        if (!Meteor.userId()) {
            return 0;
        }
        return Tasks.find({checked: {$ne: true}}).count();
    },
    hideCompleted: function () {
        return Session.get('hideCompleted');
    },
    categories: function () {
        return Categories;
    }
});

Template.header.events({
    'submit .new-task': function (e) {
        e.preventDefault();

        var category = $(e.target).find('[name="category"]').val(),
            together = $(e.target).find('[name="together"]').prop('checked'),
            text = $(e.target).find('[name="text"]').val();

        Meteor.call('addTask', {
            category: category,
            together: together,
            text: text
        });

        event.target.text.value = '';
        return false;
    },
    'change .hide-completed input': function (event) {
        Session.set('hideCompleted', event.target.checked);
    }
});

Template.header.rendered = function () {
    $('#signup-link').remove();
};