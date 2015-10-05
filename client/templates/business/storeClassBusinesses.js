Template.storeClassBusinesses.helpers({
  storeClass: function () {
    return StoreClasses.findOne({_id: Router.current().params._id});
  },
  storeClassBusinesses: function () {
    console.log(StoreBusinesses.find({}).fetch());
    return StoreBusinesses.find({storeClassId: Router.current().params._id});
  }
});
