Meteor.publish('store', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    return Stores.findOne({creator: user.username});
  }
});
