Template.infoModal.events({
    'change textarea': function (e) {
        Meteor.call('updateTask', this._id, {info: $(e.target).val()});
    }
});