Template.customerBind.helpers({
  filteredCustomers: function() {
    console.log(Session.get("filteredCustomers"));
    return Session.get("filteredCustomers");
  },
  titleTransfer: function(gender) {
    return (gender && (gender == 'male')) ? '先生' : '女士';
  }
});

Template.customerBind.events({
  'click .create-new-customer': function (event, template) {
    // IonModal.open('itemNew', {class: this});
    console.log(template.find('.keyword').value);
    IonModal.open('customerNew', {keyword: template.find('.keyword').value});
  },
  'input .keyword': function(event, template) {
    if(!template.find('.keyword').value || template.find('.keyword').value.length == 0) {
      Session.set("filteredCustomers", []);
      return ;
    }
    console.log(template.find('.keyword').value);
    console.log(StoreCustomers.find().fetch());

    var filteredCustomers = _.filter(StoreCustomers.find().fetch(), function(customer){
      var mobile = customer.mobile + "";
      console.log(mobile);
      return mobile.search(template.find('.keyword').value) > -1;
    });
    console.log(filteredCustomers);
    Session.set("filteredCustomers", filteredCustomers );
  },
  'click [data-dismiss=modal]': function (event, template) {
    Session.set("filteredCustomers", undefined);
  },
  'click .selected-customer-row': function (event, template) {
    console.log(this.customer);
    var currentOrder = Session.get("currentOrder");
    currentOrder.customer = this.customer;
    Session.set("currentOrder", currentOrder);
    Session.set("filteredCustomers", undefined);
    IonModal.close('customerBind');
  },
});
