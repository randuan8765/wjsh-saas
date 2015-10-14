Template.itemChooseAccessory.helpers({
  accessoryChecked : function(key) {
    return Session.get("currentItem")&&Session.get("currentItem").accessories ? Session.get("currentItem").accessories[key] : false;
  },
  accessoriesIter : function() {
    return Session.get("currentItem")&&Session.get("currentItem").accessories ? _.keys(Session.get("currentItem").accessories) : Session.get("currentItem");
  }
});

Template.itemChooseAccessory.events({
  'change .selected-accessory-row': function (event, template) {
    event.preventDefault();
    var currentItem = Session.get("currentItem");
    currentItem.accessories[this.accessory] = event.target.checked;
    Session.set("currentItem", currentItem);

  },
  'click [data-dismiss=modal]': function (event, template) {
    var currentItem = Session.get("currentItem");
    if(Session.get("accessoryTmp")) {
      currentItem.accessories = Session.get("accessoryTmp");
      Session.set("accessoryTmp", undefined);
    } else{
      delete currentItem.accessories;
    }

    Session.set("currentItem", currentItem);
    console.log(currentItem);
  },
  'click [type=submit]': function (event, template) {
    console.log(Session.get("currentItem"));
    IonModal.close('itemChooseAccessory');
  }
});
