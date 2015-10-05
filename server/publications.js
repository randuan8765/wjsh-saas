Meteor.publish('store', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    return Stores.find({_id: user.profile.storeId});
  }
});


Meteor.publish('storeClasses', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    return StoreClasses.find({storeId: user.profile.storeId});
  }
});

StoreClasses.allow({
  'insert': function(userId, doc) {
    // return userId;
    return false;
  },
  'update': function(userId, doc, fields, modifier) {
    // return userId === doc.userId;
    return false;
  },
  'remove': function(userId, doc) {
    return false;
  }
});


Meteor.publish('storeBusinesses', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    return StoreBusinesses.find({storeId: user.profile.storeId});
  }
});

StoreBusinesses.allow({
  'insert': function(userId, doc) {
    // return userId;
    return false;
  },
  'update': function(userId, doc, fields, modifier) {
    // return userId === doc.userId;
    return true;
  },
  'remove': function(userId, doc) {
    return false;
  }
});


Meteor.publish('area', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    var store = Stores.findOne(user.profile.storeId);
    var area = Areas.find({_id: store.areaId}, {fields: {preManager: 1, postManager: 1}});
    return area;
  }
});
