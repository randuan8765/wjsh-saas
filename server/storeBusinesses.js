// Meteor.publish('storeBusinesses', function() {
//   if(this.userId) {
//     var user = Meteor.users.findOne(this.userId);
//     return StoreBusinesses.find({storeId: user.profile.storeId});
//   }
// });
//
// StoreBusinesses.allow({
//   'insert': function(userId, doc) {
//     // return userId;
//     return false;
//   },
//   'update': function(userId, doc, fields, modifier) {
//     // return userId === doc.userId;
//     return true;
//   },
//   'remove': function(userId, doc) {
//     return false;
//   }
// });
