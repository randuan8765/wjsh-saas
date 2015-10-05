// Meteor.publish('storeClasses', function() {
//   if(this.userId) {
//     var user = Meteor.users.findOne(this.userId);
//     console.log(user);
//     console.log(StoreClasses.find({storeId: user.profile.storeId}).fetch());
//     return StoreClasses.find({storeId: user.profile.storeId});
//   }
// });
//
// StoreClasses.allow({
//   'insert': function(userId, doc) {
//     // return userId;
//     return false;
//   },
//   'update': function(userId, doc, fields, modifier) {
//     // return userId === doc.userId;
//     return false;
//   },
//   'remove': function(userId, doc) {
//     return false;
//   }
// });
