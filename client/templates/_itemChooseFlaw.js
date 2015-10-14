Template.itemChooseFlaw.helpers({
  flawChecked : function(key) {
    return Session.get("currentItem")&&Session.get("currentItem").flaws ? Session.get("currentItem").flaws[key] : false;
  },
  flawsIter : function() {
    return Session.get("currentItem")&&Session.get("currentItem").flaws ? _.keys(Session.get("currentItem").flaws) : Session.get("currentItem");
  }
});

Template.itemChooseFlaw.events({
  'change .selected-flaw-row': function (event, template) {
    event.preventDefault();
    var currentItem = Session.get("currentItem");
    console.log(event.target.checked);
    currentItem.flaws[this.flaw] = !currentItem.flaws[this.flaw];
    Session.set("currentItem", currentItem);
  },
  'click [data-dismiss=modal]': function (event, template) {
    var currentItem = Session.get("currentItem");
    if(Session.get("flawTmp")) {
      currentItem.flaws = Session.get("flawTmp");
      Session.set("flawTmp", undefined);
    } else{
      delete currentItem.flaws;
    }

    Session.set("currentItem", currentItem);
    console.log(currentItem);
  },
  'click [type=submit]': function (event, template) {
    console.log(Session.get("currentItem"));
    IonModal.close('itemChooseFlaw');
  }
});
