Meteor.publish('storeClasses', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    var store = Stores.findOne({creator: user.username});
    return StoreClasses.find({storeId: store._id});
  }
});

Meteor.publish('storeClass', function(_id) {
  return StoreClasses.find({_id: _id});
});

StoreClasses.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    // return userId === doc.userId;
    return true;
  },
  'remove': function(userId, doc) {
    return false;
  }
});
