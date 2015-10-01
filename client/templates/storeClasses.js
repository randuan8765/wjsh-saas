Template.storeClasses.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('storeClasses');
  }.bind(this));
};

Template.storeClasses.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.storeClasses.helpers({
  storeClasses: function () {
    return StoreClasses.find();
  }
});
