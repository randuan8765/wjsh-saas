Template.customerOrders.helpers({
  customer: function () {
    return StoreCustomers.findOne({_id: Router.current().params._id});
  },
  customerOrders: function () {
    console.log(Items.find({customerId: Router.current().params._id}).fetch());
    var items = Items.find({customerId: Router.current().params._id}, {sort: {orderKey: -1, subKey: 1}}).fetch();
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
  transferStatus: function(status) {
    console.log(status);
    if(status == 'toClean') {
      return '待清洗';
    } else if(status == 'cleaning') {
      return '清洗中';
    } else if(status == 'returnedToStore') {
      return '客户未取';
    } else {
      return '客户已取';
    }
  }
});

Template.layout.events({
  'click .backToCustomers': function (event, template) {
    Session.set("filteredCustomers");
    console.log(Session.get("filteredCustomers"));
  },
});

Template.customerOrders.events({
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
  }
});
