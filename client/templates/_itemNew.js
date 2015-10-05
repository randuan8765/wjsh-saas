Template.itemChooseBusiness.helpers({

});

Template.itemChooseBusiness.events({
  'click .selected-business-row': function (event, template) {
    alert(event.currentTarget.id);
    Session.set("selectedItemBusiness", event.currentTarget.id);
    IonModal.close('itemChooseBusiness');
  }
});

Template.itemNew.helpers({
  selectedItemBusiness: function() {
    return Session.get("selectedItemBusiness");
  }
});
