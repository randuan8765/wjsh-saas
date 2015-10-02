Meteor.publish('storeBusinesses', function(storeId) {
  if(this.userId) {
    // var user = Meteor.users.findOne(this.userId);
    // var store = Stores.findOne({creator: user.username});
    return StoreBusinesses.find({storeId: storeId});
  }
});

Meteor.publish('storeBusiness', function(_id) {
  return StoreBusinesses.find({_id: _id});
});

StoreBusinesses.allow({
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
