Meteor.methods({
  'Items.create': function (item) {
    if (!Meteor.user()) {
      throw new Meteor.Error("not-authorized");
    }

    if(!item.business) {
      return ;
    }

    return Items.insert(item);
  },
  'Items.update': function (storeBusinessId) {
    if (!Meteor.user()) {
      throw new Meteor.Error("not-authorized");
    }
  },
  'Items.markFinish': function (itemIds) {
    if (!Meteor.user()) {
      throw new Meteor.Error("not-authorized");
    }
    _.each(itemIds, function(itemId) {
      var item = Items.findOne(itemId);
      if(Meteor.user().profile.storeId != item.business.storeId) {
        throw new Meteor.Error("not-authorized");
      }

      Items.update({_id: itemId}, {$set: { status: 'finish' }});
    });
  },
  'Orders.create': function (order) {//先同步，回头再改成异步处理
    if (!Meteor.user()) {
      throw new Meteor.Error("not-authorized");
    }

    if(!order.items || order.items.length == 0) {
      return ;
    }

    var orderId = new Mongo.ObjectID()._str;
    var storeId = Meteor.user().profile.storeId;
    Stores.update({_id: storeId}, {$inc: {orderCount: 1}, $set: {lastOrderId: orderId}});
    var store = Stores.findOne(storeId);

    var orderCount = 0;
    var loopMax = 3;
    while(store.lastOrderId != orderId && loopMax-- > 0) {
      Stores.update({_id: storeId}, {$inc: {orderCount: 1}, $set: {lastOrderId: orderId}});
      store = Stores.findOne(storeId);
    }
    if(store.lastOrderId != orderId) {
      console.log('fatal problem!');
      return ;
    }

    orderCount = store.orderCount + '';
    var keyLast3digit = orderCount.length >= 3 ? orderCount : new Array(3 - orderCount.length + 1).join(0) + orderCount;
    var orderKey = store.key + keyLast3digit;

    var itemIds = _.map(order.items, function(item, index) { //要改成能记录失败信息
      if(order.customer) {
        _.extend(item, {customerId: order.customer._id, orderId: orderId, orderKey: orderKey, subKey: (index+1), status: 'toClean', createdAt: new Date() });
      } else {
        _.extend(item, {orderId: orderId, orderKey: orderKey, subKey: (index+1), status: 'toClean', createdAt: new Date() });
      }

      return Items.insert(item);
    });

    order.itemIds = itemIds;
    order.storeId = storeId;

    order._id = orderId;
    order.key = orderKey;

    order.createdAt = new Date();

    delete order.items;

    console.log(Orders.insert(order));

    // return Orders.insert(order);
  },
  'StoreBusinesses.updatePrice': function (storeBusinessId, price) {
    if (!Meteor.user()) {
      throw new Meteor.Error("not-authorized");
    }

    StoreBusinesses.update({_id: storeBusinessId}, {$set: { price: price}});
  },
});
