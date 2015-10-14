// Meteor.publish('store', function() {
//   if(this.userId) {
//     var user = Meteor.users.findOne(this.userId);
//     return Stores.find({_id: user.profile.storeId});
//   }
// });


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

Meteor.publish('storeAndArea', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    var store = Stores.find({_id: user.profile.storeId});
    if(store.fetch().length === 0) {
      console.log('没有storeId');
      return [store];
    }
    var storeObj = store.fetch()[0];
    var area = Areas.find({_id: storeObj.areaId}, {fields: {preManager: 1, postManager: 1}});
    if(area.fetch().length === 0) {
      console.log('没有areaId');
      return [store, area];
    }
    var areaBusinesses = AreaBusinesses.find({areaId: area.fetch()[0]._id});
    return [
      store,
      area,
      areaBusinesses
    ];
  }
});

Meteor.publish('classes', function() {
  if(this.userId) {
    return Classes.find();
  }
});

// Meteor.publish('areaAndBusinesses', function() {
//   if(this.userId) {
//     var user = Meteor.users.findOne(this.userId);
//     var store = Stores.findOne(user.profile.storeId);
//     var area = Areas.find({_id: store.areaId}, {fields: {preManager: 1, postManager: 1}});
//     return [
//       area,
//       AreaBusinesses.find({areaId: area._id})
//
//     ];
//   }
// });

Meteor.publish('storeCustomers', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    return StoreCustomers.find({storeId: user.profile.storeId});
  }
});

StoreCustomers.allow({
  'insert': function(userId, doc) {
    // return userId;
    return true;
  },
  'update': function(userId, doc, fields, modifier) {
    // return userId === doc.userId;
    return true;
  },
  'remove': function(userId, doc) {
    return false;
  }
});

Meteor.publish('items', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    return Items.find({'business.storeId': user.profile.storeId});
  }
});

Meteor.publish('orders', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    return Orders.find({storeId: user.profile.storeId});
  }
});
