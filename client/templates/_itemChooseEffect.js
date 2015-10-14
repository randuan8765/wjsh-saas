Template.itemChooseEffect.helpers({
  effectChecked : function(key) {
    return Session.get("currentItem")&&Session.get("currentItem").effects ? Session.get("currentItem").effects[key] : false;
  },
  effectsIter : function() {
    return Session.get("currentItem")&&Session.get("currentItem").effects ? _.keys(Session.get("currentItem").effects) : Session.get("currentItem");
  }
});

Template.itemChooseEffect.events({
  'change .selected-effect-row': function (event, template) {
    event.preventDefault();
    var currentItem = Session.get("currentItem");
    currentItem.effects[this.effect] = event.target.checked;
    Session.set("currentItem", currentItem);

  },
  'click [data-dismiss=modal]': function (event, template) {
    var currentItem = Session.get("currentItem");
    if(Session.get("effectTmp")) {
      currentItem.effects = Session.get("effectTmp");
      Session.set("effectTmp", undefined);
    } else{
      delete currentItem.effects;
    }

    Session.set("currentItem", currentItem);
    console.log(currentItem);
  },
  'click [type=submit]': function (event, template) {
    console.log(Session.get("currentItem"));
    IonModal.close('itemChooseEffect');
  }
});
