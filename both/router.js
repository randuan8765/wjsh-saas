Router.configure({
  notFoundTemplate: 'not_found', //to learn
  loadingTemplate: 'loading',
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    Session.set('urlBeforeLogin', this.url);
    this.render('signUp');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
});

Meteor.startup(function () {
  if (Meteor.isClient) {
    // // returns a "location" like object with all of the url parts
    // var location = Iron.Location.get();
    // if (location.queryObject.platformOverride) {
    //   Session.set('platformOverride', location.queryObject.platformOverride);
    // }
  }
});

Router.map(function() {
  this.route('list', {
    path: '/',
    subscriptions: function () {

      var array = [];
      array.push(Meteor.subscribe("storeClasses"));
      array.push(Meteor.subscribe("storeBusinesses"));
      return array;
    },

  });
  this.route('contacts', {
    path: '/contacts',
    subscriptions: function () {
      return Meteor.subscribe("area");
    },
  });
  this.route('storeClasses', {
    path: '/storeClasses',
    subscriptions: function () {
      return Meteor.subscribe("storeClasses");
    },
  });
  this.route('storeClass.businesses', {
    path: '/storeClasses/:_id',
    subscriptions: function () {
      var array = [];
      array.push(Meteor.subscribe("storeClasses"));
      array.push(Meteor.subscribe("storeBusinesses"));
      return array;
    },
  });

});

// Router.route('/', {
//   // data: function() {
//   //   return Stores.findOne({_id: this.params._id});
//   // }
// });
