Template.itemChooseBusiness.events({
  'click .selected-business-row': function (event, template) {
    console.log(Session.get("currentItem"));
    if(Session.get("currentItem") && Session.get("currentItem").business) {
      if(Session.get("currentItem").business._id !== this.business._id) {
        if('updateIndex' in Session.get("currentItem")) {
          console.log(Session.get("currentItem"));
          var index = Session.get("currentItem").updateIndex;
          Session.set("currentItem", {business: this.business, updateIndex: index});
          console.log({business: this.business, updateIndex: index});
          console.log(Session.get("currentItem"));
        } else {
          Session.set("currentItem", {business: this.business});
        }

      }
    } else {
      Session.set("currentItem", {business: this.business});
    }

    console.log(Session.get("currentItem"));
    IonModal.close('itemChooseBusiness');
  }
});
