Router.configure({
  layoutTemplate: 'layout'
});

Meteor.startup(function () {
  if (Meteor.isClient) {
    // returns a "location" like object with all of the url parts
    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
  }
});

Router.map(function() {
  this.route('list', {path: '/', layoutTemplate: 'layout'});
  this.route('storeClasses', {path: '/storeClasses', layoutTemplate: 'businessLayout'});
  this.route('storeClass.businesses', {path: '/storeClasses/:_id', layoutTemplate: 'businessLayout'});

});
