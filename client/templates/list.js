

Template.list.helpers({
  storeClasses: function () {
    return StoreClasses.find();
  },
});

// Template.factories.helpers({
//   factories: function () {
//     return Factories.find();
//   },
//   selectedFactoryDoc: function () {
//     return Factories.findOne(Session.get("selectedFactoryId"));
//   },
//   isSelectedFactory: function () {
//     return Session.equals("selectedFactoryId", this._id);
//   },
//   formType: function () {
//     if (Session.get("selectedFactoryId")) {
//       return "update";
//     } else {
//       return "insert";
//     }
//   }
//
// });
//
Template.list.events({
  'click .create-new-item': function (event, template) {
    IonModal.open('itemNew', {classId: event.currentTarget.id});
    ;
    IonModal.open('itemChooseBusiness', {storeClassBusinesses: StoreBusinesses.find({storeClassId: event.currentTarget.id})});
  },
});
