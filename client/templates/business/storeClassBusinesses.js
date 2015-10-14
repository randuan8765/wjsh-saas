Template.storeClassBusinesses.helpers({
  storeClass: function () {
    return StoreClasses.findOne({_id: Router.current().params._id});
  },
  storeClassBusinesses: function () {
    console.log(StoreBusinesses.find({}).fetch());
    return StoreBusinesses.find({storeClassId: Router.current().params._id});
  },
  count: function(array) {
    return array ? array.length: 0;
  }
});

Template.storeClassBusinesses.created = function () {
  Session.set('ionTab.current', 'storeClass.businesses');
};

Template.storeClassBusinesses.rendered = function () {
  console.log(Session.get('currentPage'));
  if(Session.get('currentPage') == 'wujing') {
      console.log(this.findAll('.nav-status'));
      var storeTab = this.findAll('.nav-status')[0];
      var wujingTab = this.findAll('.nav-status')[2];
  }
};

Template.storeClassBusinesses.events({
  'click .nav-status': function(event, template) {

    if(this.status == 'store') {
      console.log(this);
      _.map(template.findAll('.item-price'), function(element) {
        element.style.display = "flex";
      });
      _.map(template.findAll('.item-area-business-count'), function(element) {
        element.style.display = "none";
      });
      _.map(template.findAll('.business-item'), function(element) {
        console.log(element.href);
        element.href = element.href.replace(/\/areaBusinesses/,'');
        console.log(element.href);
      });
      Session.set('currentPage', 'store');
    } else {
      console.log(this);
      console.log(template.findAll('.item-price'));
      // template.findAll('.item-note i').style.visibility = "hidden";
      _.map(template.findAll('.item-price'), function(element) {
        element.style.display = "none";
      });
      _.map(template.findAll('.item-area-business-count'), function(element) {
        element.style.display = "flex";
      });
      _.map(template.findAll('.business-item'), function(element) {
        console.log(element.href);
        element.href = element.href.replace(/\/areaBusinesses/,'');
        element.href = element.href + '/areaBusinesses'
        console.log(element.href);
      });

      Session.set('currentPage', 'wujing');
    }
  }
});
