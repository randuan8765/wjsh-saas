Template.orderDetail.helpers({
  order: function () {
    var order = Orders.findOne(Router.current().params._id);
    console.log(order);
    var items = [];
    _.each(order.itemIds, function(itemId) {
      items.push(Items.findOne(itemId));
    });
    order.items = items;
    console.log(order);
    return order;
  },
});
