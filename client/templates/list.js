

Template.list.helpers({
  times: function () {
    var times = [];
    _(20).times(function(n){
      times.push(n);
    });
    return times;
  },
  products: function () {
    return Products.find({}, {sort: {numberOfVotes: -1, name: -1}});
  }
});

Template.list.created = function () {
  this.autorun(function () {
    // this.subscription = Meteor.subscribe('products');
  }.bind(this));
};

Template.list.rendered = function () {

  if (!Meteor.loggingIn() && !Meteor.user()) { //应该是任何模板都发生，但是尚不知道怎么放在顶级模板
    IonModal.open('signUp');
  }

  // this.autorun(function () {
  //   if (!this.subscription.ready()) {
  //     alert(3);
  //     IonLoading.show();
  //   } else {
  //     alert(4);
  //     IonLoading.hide();
  //   }
  // }.bind(this));
};
