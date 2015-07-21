Template.task.created = function () {
    intervalTomato(this.data._id, this.data.tomato);
};

Template.task.helpers({
    getUsername: function () {
        if (this.together) {
            return 'Together';
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
        return this.info && this.info !== '';
    },
    tomatoVisible: function () {
        return getTomatoState(this.tomato) === 'stopped' ? 'hide' : '';
    },
    tomatoCountVisible: function () {
        return Session.get(this._id + '_total') || getTomatoTotal(this.tomato) ? '' : 'hide';
    },
    tomatoCount: function () {
        return getTomatoCount(Session.get(this._id + '_total') || getTomatoTotal(this.tomato));
    },
    tomatoTime: function () {
        return getTomatoTime(Session.get(this._id + '_total') || getTomatoTotal(this.tomato));
    },
    tomatoActionVisible: function (state) {
        if (getTomatoState(this.tomato) === 'stopped') {
            return state === 'play' ? 'show' : '';
        }
        return state === 'play' ? '' : 'show';
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
    },
    'click .fa-play': function () {
        if (!this.tomato || !this.tomato.hasOwnProperty('total')) {
            this.tomato = {
                total: 0,
                start_time: 0
            };
        }
        this.tomato.start_time = +new Date();
        intervalTomato(this._id, this.tomato);
        Meteor.call('updateTask', this._id, {tomato: this.tomato});
    },
    'click .fa-stop': function () {
        this.tomato.total += +new Date() - this.tomato.start_time;
        this.tomato.start_time = 0;
        intervalTomato(this._id, this.tomato);
        Meteor.call('updateTask', this._id, {tomato: this.tomato});
    }
});

function intervalTomato(id, tomato) {
    if (getTomatoState(tomato) === 'started') {
        Session.set(id + '_total', getTomatoTotal(tomato));
        Session.set(id + '_interval', setInterval(function () {
            Session.set(id + '_total', getTomatoTotal(tomato));
        }, 1000));
    } else {
        clearInterval(Session.get(id + '_interval'));
    }
}

function getTomatoState(tomato) {
    return !tomato || tomato.start_time === 0 ? 'stopped' : 'started';
}

function getTomatoTotal(tomato) {
    if (!tomato) {
        return 0;
    }

    if (tomato.start_time) {
        return tomato.total + (+new Date() - tomato.start_time);
    }
    return tomato.total;
}

function getTomatoCount(total) {
    return ~~(total / 1800000) || '';
}

function getTomatoTime(total) {
    var seconds = ~~(total / 1000) % 1800,
        m = ~~(seconds / 60),
        s = seconds % 60;
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}