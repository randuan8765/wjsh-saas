Template.contacts.events({
  'click .contact-bd-actionSheet': function (event, template) {
    console.log(this.employee);
    IonActionSheet.show({
      titleText: '联系我的专属BD经理：' + this.employee.preManagerName,
      buttons: [
        { text: '<a href="tel:'+ this.employee.preManagerMobile +'" class="button button-positive button-outline">'+ this.employee.preManagerMobile +'</a>' },
      ],
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Shared!');
        }
        if (index === 1) {
          console.log('Moved!');
        }
        return true;
      }
    });
  },
  'click .contact-business-actionSheet': function (event, template) {
    console.log(this.employee);
    IonActionSheet.show({
      titleText: '联系我的专属业务经理：' + this.employee.postManagerName,
      buttons: [
        { text: '<a href="tel:'+ this.employee.postManagerMobile +'" class="button button-positive button-outline">'+ this.employee.postManagerMobile +'</a>' },
      ],
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Shared!');
        }
        if (index === 1) {
          console.log('Moved!');
        }
        return true;
      }
    });
  },
  'click .contact-400-actionSheet': function (event, template) {
    IonActionSheet.show({
      titleText: '拨打免费400电话',
      buttons: [
        { text: '<a href="tel:+1800229933" class="button button-positive button-outline">4008-202-000</a>' },
      ],
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Shared!');
        }
        if (index === 1) {
          console.log('Moved!');
        }
        return true;
      }
    });
  }
});

// Template.contacts.created = function () {
//   this.autorun(function () {
//     this.subscription = Meteor.subscribe('storeClasses');
//   }.bind(this));
// };
//
// Template.contacts.rendered = function () {
//   this.autorun(function () {
//     if (!this.subscription.ready()) {
//       IonLoading.show();
//     } else {
//       IonLoading.hide();
//     }
//   }.bind(this));
// };
//
Template.contacts.helpers({
  area: function () {
    console.log(Areas.find().fetch()[0]);
    return Areas.find().fetch()[0];
  }
});
