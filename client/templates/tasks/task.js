Template.task.helpers({
    getUsername: function () {
        if (this.together) {
            return 'Together'
        }
        return this.username;
    },
    getCategory: function () {
        for (var i = 0; i < Categories.length; i++) {
            if (Categories[i].name === this.category) {
                return Categories[i].title + '：';
            }
        }
        return '';
    }
});

Template.task.events({
    'click .toggle-checked': function () {
        Meteor.call('setChecked', this._id, ! this.checked);
    },
    'click .delete': function () {
        if (!confirm('确定删除该任务？')) {
            return;
        }
        Meteor.call('deleteTask', this._id);
    }
});