Template.storeBusinessPrice.helpers({
  storeBusiness: function () {
    console.log(StoreBusinesses.findOne({_id: Router.current().params._id}));
    return StoreBusinesses.findOne({_id: Router.current().params._id});
  },

});

Template.layout.events({
  'click .price-save': function (event, template) {
    var price = Number(template.find('[name=price]').value).toFixed(2);
    console.log(price);
    if(isNaN(price)) {
      IonPopup.alert({
        title: '出错啦',
        template: '金额必须是数字',
        okText: '知道了'
      });
      return ;
    }
    Meteor.call("StoreBusinesses.updatePrice", Router.current().params._id, Number(price));
    history.back();
  },
});
