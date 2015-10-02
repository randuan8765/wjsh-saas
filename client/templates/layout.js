Template.layout.events({
  'click .create-new-item': function (event, template) {
    IonModal.open('itemNew', {classId: event.currentTarget.id});
    IonModal.open('createShoeItem');
  },
  'click .ion-logout': function (event, template) {
    alert('logout');
    AccountsTemplates.logout();
    IonModal.open('signUp');
  }
});


Template.layout.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('storeClasses');
  }.bind(this));
};

Template.layout.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.layout.helpers({
  storeClasses: function () {
    return StoreClasses.find();
  }
});
