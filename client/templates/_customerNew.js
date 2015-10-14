Template.customerNew.helpers({
  isFemale: function() {
    return !Session.get('gender') || Session.get('gender') == 'female';
  },
  isMale: function() {
    return Session.get('gender') && Session.get('gender') == 'male';
  }
});

Template.customerNew.events({
  'click [type=submit]': function (event, template) {
    // console.log(Session.get("orderId"));
    //_.extend(Session.get("currentItem"), {orderId: Session.get("orderId")});

    //Meteor.call("Items.create", Session.get("currentItem"));
    // if(!Session.get("currentOrder")) {
    //   Session.set("currentOrder", {items: []});
    // }
    // console.log(Session.get("currentOrder"));
    // var currentOrder = Session.get("currentOrder");
    // currentOrder.items.push(Session.get("currentItem"));
    // Session.set("currentOrder", currentOrder);
    // console.log(Session.get("currentOrder"));
    // Session.set("currentItem", undefined);
    // IonModal.close('itemNew');
  },
  'click .checkbox': function(event, template) {
    if(event.target.value == 'male') {
      event.target.checked = true;

    } else {
      event.target.checked = true;

    }
    Session.set('gender', event.target.value);
    Session.get('gender');
  },
});

AutoForm.hooks({
  'customer-new-form': {
    onSuccess: function (operation, result, template) {
      var newCustomer = StoreCustomers.findOne(result);
      if(newCustomer) {
        if(!Session.get("filteredCustomers")) {
          Session.set("filteredCustomers", [newCustomer] );
        } else {
          var customers = Session.get("filteredCustomers");
          customers.push(newCustomer);
          Session.set("filteredCustomers", customers );
        }
      }
      IonModal.close();
      Session.set('gender', undefined);
    },

    onError: function(operation, error, template) {
      console.log(error);
      // alert(error);
    }
  }
});
