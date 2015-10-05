Template.layout.events({

  'click .ion-logout': function (event, template) {
    AccountsTemplates.logout();
    // IonModal.open('signUp');//后面改成router.render
  }
});


Template.layout.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('store');
  }.bind(this));
};

Template.layout.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      // IonLoading.show(); //貌似得删掉，因为不可能因为网速慢就不渲染页面了;而且影响了非登陆状态
    } else {
      Session.set('storeObj', Stores.find().fetch()[0]);
      // IonLoading.hide();
    }
  }.bind(this));
};

Template.layout.helpers({
  store: function () {
    return Session.get('storeObj');
  }
});
