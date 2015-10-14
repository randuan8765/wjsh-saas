Template.itemChooseDiscount.helpers({
  discountPrices: function() {
    var price = 0;
    if(!Session.get("currentItem") || !Session.get("currentItem").business) {
      return [];
    }
    price = Session.get("currentItem").business.price;
    var discountPrices = [
      {discount: 1, name: '无折扣', price: price, selected: false}
    ];
    for(var i = 9.5; i >= 1; i = i - 0.5) {
      if(Session.get("currentItem") && Session.get("currentItem").discount) {
        discountPrices.push({discount: (i*0.1).toFixed(2), name: (i%1==0?i:i*10)+'折', price: (price*i*0.1).toFixed(2), selected: Session.get("currentItem").discount*10==i});
      } else {
        discountPrices.push({discount: (i*0.1).toFixed(2), name: (i%1==0?i:i*10)+'折', price: (price*i*0.1).toFixed(2), selected: false});
      }
    }
    console.log(discountPrices);
    return discountPrices;

  },
});

Template.itemChooseDiscount.events({
  'click [type=submit]': function (event, template) {
    console.log(template.find('.selected-discount-row select').value);
    var currentItem = Session.get("currentItem");
    var selectedValue = Number(template.find('.selected-discount-row select').value);
    if(selectedValue == 1) {
      delete currentItem.discount;
    } else {
      currentItem.discount = selectedValue;
    }
    Session.set("currentItem", currentItem);
    IonModal.close('itemChooseDiscount');
  },
});
