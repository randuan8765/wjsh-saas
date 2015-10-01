Template.storeClassBusinesses.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('storeClass', Router.current().params._id);
  }.bind(this));
};

Template.storeClassBusinesses.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.storeClassBusinesses.helpers({
  storeClass: function () {
    return StoreClasses.findOne({_id: Router.current().params._id});
  }
});
