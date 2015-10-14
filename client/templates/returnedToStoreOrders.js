Template.returnedToStoreOrders.helpers({
  storeClasses: function () {
    return StoreClasses.find();
  },
  orders: function() {
    console.log(Items.find().fetch());
    var items = Items.find({status: 'returnedToStore'}, {sort: {orderKey: -1, subKey: 1}}).fetch();
    console.log(items);
    var orders = _.groupBy(items, function(item) {
      return item.orderKey;
    });
    console.log(orders);
    console.log(_.values(orders));
    return _.values(orders);
  },
  pairToString: function(obj) {
    var str = "";
    for(var key in obj) {
      if(obj[key]) {
        str += key + "、"
      }
    }
    console.log(str);
    if(str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  },
});

Template.returnedToStoreOrders.events({
  'click .create-new-item': function (event, template) {
    IonModal.open('orderNew');
    IonModal.open('itemNew', {class: this});
    IonModal.open('itemChooseBusiness', {storeClassBusinesses: StoreBusinesses.find({storeClassId: event.currentTarget.id})});
  },
  'click .order-row': function(event, template) {
    console.log(this);
    var order = Orders.findOne(this[0].orderId);
    console.log(order);
    var items = [];
    _.each(order.itemIds, function(itemId) {
      items.push(Items.findOne(itemId));
    });
    order.items = items;
    console.log(order);
    // Router.go('order.detail', {_id: this[0].orderId});

    Session.set('currentOrder', order);
    IonModal.open('orderNew', {update: true});
  },
});
