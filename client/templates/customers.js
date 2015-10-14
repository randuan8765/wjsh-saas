Template.customers.helpers({
  customers: function () {
    console.log(Session.get("filteredCustomers"));
    return StoreCustomers.find();
    // return Session.get("filteredCustomers");
  },
  filteredCustomers: function() {
    console.log(Session.get("filteredCustomers"));
    if(!Session.get("filteredCustomers")) {
      return StoreCustomers.find();
    }
    return Session.get("filteredCustomers");
  },
  titleTransfer: function(gender) {
    return (gender && (gender == 'male')) ? '先生' : '女士';
  }
});

Template.customers.events({
  'input .keyword': function(event, template) {
    
    var filteredCustomers = _.filter(StoreCustomers.find().fetch(), function(customer){
      var mobile = customer.mobile + "";
      console.log(mobile);
      return mobile.search(template.find('.keyword').value) > -1;
    });
    console.log(filteredCustomers);
    Session.set("filteredCustomers", filteredCustomers );
  },
});
