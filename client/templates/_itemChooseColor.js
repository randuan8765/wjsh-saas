Template.itemChooseColor.helpers({
  colorChecked : function(key) {
    return Session.get("currentItem")&&Session.get("currentItem").colors ? Session.get("currentItem").colors[key] : false;
  },
  colorsIter : function() {
    return Session.get("currentItem")&&Session.get("currentItem").colors ? _.keys(Session.get("currentItem").colors) : Session.get("currentItem");
  }
});

Template.itemChooseColor.events({
  'change .selected-color-row': function (event, template) {
    event.preventDefault();
    var currentItem = Session.get("currentItem");
    currentItem.colors[this.color] = event.target.checked;
    Session.set("currentItem", currentItem);

  },
  'click [data-dismiss=modal]': function (event, template) {
    var currentItem = Session.get("currentItem");
    if(Session.get("colorTmp")) {
      currentItem.colors = Session.get("colorTmp");
      Session.set("colorTmp", undefined);
    } else{
      delete currentItem.colors;
    }

    Session.set("currentItem", currentItem);
    console.log(currentItem);
  },
  'click [type=submit]': function (event, template) {
    console.log(Session.get("currentItem"));
    IonModal.close('itemChooseColor');
  }
});
