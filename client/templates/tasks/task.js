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
    },
    infoActive: function () {
        return this.info !== '';
    }
});

Template.task.events({
    'click .toggle-checked': function () {
        Meteor.call('updateTask', this._id, {checked: !this.checked});
    },
    'click .info': function () {
        AntiModals.overlay('infoModal', {
            data: this
        });
    },
    'click .delete': function () {
        if (!confirm('确定删除该任务？')) {
            return;
        }
        Meteor.call('deleteTask', this._id);
    }
});