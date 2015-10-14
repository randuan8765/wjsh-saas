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
    console.log(Meteor.user().profile.storeId);
    if(!Meteor.user().profile.storeId) {
      console.log(Meteor.user());
      Session.set('noStore', 'noStore');
      this.render('contacts');
    } else {
      this.next();
    }

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

//记得把常用的subscription挪到全局定义里
Router.map(function() {
  this.route('orders', {
    path: '/',
    // subscriptions: function () {
    //
    //   var array = [];
    //   array.push(Meteor.subscribe("storeClasses"));
    //   array.push(Meteor.subscribe("storeBusinesses"));
    //   return array;
    // },

  });
  this.route('cleaningOrders', {
    path: '/cleaningOrders',
    // subscriptions: function () {
    //
    //   var array = [];
    //   array.push(Meteor.subscribe("storeClasses"));
    //   array.push(Meteor.subscribe("storeBusinesses"));
    //   return array;
    // },

  });
  this.route('returnedToStoreOrders', {
    path: '/returnedToStoreOrders',
    // subscriptions: function () {
    //
    //   var array = [];
    //   array.push(Meteor.subscribe("storeClasses"));
    //   array.push(Meteor.subscribe("storeBusinesses"));
    //   return array;
    // },

  });
  this.route('historyOrders', {
    path: '/historyOrders',
    // subscriptions: function () {
    //
    //   var array = [];
    //   array.push(Meteor.subscribe("storeClasses"));
    //   array.push(Meteor.subscribe("storeBusinesses"));
    //   return array;
    // },

  });
  this.route('order.detail', {
    path: 'orders/:_id',
    // subscriptions: function () {
    //
    //   var array = [];
    //   array.push(Meteor.subscribe("storeClasses"));
    //   array.push(Meteor.subscribe("storeBusinesses"));
    //   return array;
    // },

  });
  this.route('contacts', {
    path: '/contacts',
    // subscriptions: function () {
    //   return Meteor.subscribe("area"); 变名字了、放外面去
    // },
  });
  this.route('customers', {
    path: '/customers',
  });
  this.route('customer.orders', {
    path: '/customers/:_id',
  });
  this.route('storeClasses', {
    path: '/storeClasses',
    // subscriptions: function () {
    //   return Meteor.subscribe("storeClasses");
    // },
  });
  this.route('storeClass.businesses', {
    path: '/storeClasses/:_id',
    // subscriptions: function () {
    //   var array = [];
    //   array.push(Meteor.subscribe("storeClasses"));
    //   array.push(Meteor.subscribe("storeBusinesses"));
    //   return array;
    // },
  });
  this.route('storeBusiness.price', {
    path: '/storebusiness/:_id',
    // subscriptions: function () {
    //   var array = [];
    //   array.push(Meteor.subscribe("storeClasses"));
    //   array.push(Meteor.subscribe("storeBusinesses"));
    //   return array;
    // },
  });
  this.route('storeBusiness.areaBusinesses', {
    path: '/storebusiness/:_id/areaBusinesses',
    // subscriptions: function () {
    //   var array = [];
    //   array.push(Meteor.subscribe("storeClasses"));
    //   array.push(Meteor.subscribe("storeBusinesses"));
    //   return array;
    // },
  });
});
