Template.storeClassBusinesses.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('storeClass', Router.current().params._id);
    this.subscription = Meteor.subscribe('storeBusinesses', Session.get("storeId"));
  }.bind(this));
};

Template.storeClassBusinesses.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
      Session.set("classId", Router.current().params._id);
    }
  }.bind(this));
};

Template.storeClassBusinesses.helpers({
  storeClass: function () {
    return StoreClasses.findOne({_id: Router.current().params._id});
  },
  storeClassBusinesses: function () {
    return StoreBusinesses.find({classId: Router.current().params._id});
  }
});
