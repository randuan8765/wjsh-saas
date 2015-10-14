Stores = new Mongo.Collection("stores");
StoreClasses = new Mongo.Collection("storeClasses");
StoreBusinesses = new Mongo.Collection("storeBusinesses");
StoreCustomers = new Mongo.Collection("storeCustomers");

Employees = new Mongo.Collection("employees");
Areas = new Mongo.Collection("areas");
AreaBusinesses = new Mongo.Collection("areaBusinesses");

Classes = new Mongo.Collection("classes");

Items = new Mongo.Collection("items");
Orders = new Mongo.Collection("orders");

//

StoreCustomers.before.insert(function (userId, doc) {
  doc.storeId = Meteor.user().profile.storeId;
  if(Meteor.isClient) {
    console.log(Session.get('gender'));

    doc.gender = Session.get('gender') ? Session.get('gender') : 'female';
  }
  console.log(doc);
});

StoreCustomers.attachSchema(new SimpleSchema({
  name: {
    type: String,
    optional: true,
    autoform: {
      'label-type': 'stacked'
    },
    label: '姓名',
    max: 200
  },
  gender: {
    type: String,
    optional: true,
  },
  // birth: {
  //   type: String,
  //   label: '生日',
  //   optional: true,
  //   autoform: {
  //     afFieldInput: {
  //       type: "date"
  //     }
  //   }
  // },
  mobile: {
    type: String,
    autoform: {
      'label-type': 'stacked',
    },
    label: '手机号',
    max: 200,
    unique: true
  },
  // allowReceiveMessage: {
  //   type: Boolean,
  //   label: '允许发送短信',
  //   defaultValue: true,
  //   autoform: {
  //     type: 'toggle'
  //   }
  // },
  // phone: {
  //   type: String,
  //   optional: true,
  //   autoform: {
  //     'label-type': 'floating',
  //     placeholder: '座机'
  //   },
  //   max: 200
  // },
  'address': {
    type: Object,
    optional: true,
    label: '地址(选填)',
  },
  'address.fullAddress': {
    type: String,
    optional: true,
    label: '详细地址',
    autoform: {
      rows: 2,
      'label-type': 'floating',
      placeholder: '详细地址'
    },
    max: 200
  },
  // 'member': {
  //   type: Object,
  //   autoform: {
  //     type: 'toggle',
  //   },
  //   optional: true
  // },
  // // 'member.cardNumber': { 未来实现
  // //   type: String,
  // //   label: '卡面号码',
  // // },
  // 'member.type': {
  //   type: String,
  //   label: '卡类型',
  //   autoform: {
  //     options: [
  //       {value: 'High', label: '普通卡'},
  //       {value: 'Medium', label: '银卡'},
  //       {value: 'Low', label: '金卡'}
  //     ],
  //     type: 'select-radio'
  //   }
  // },

}));

StoreCustomers.simpleSchema().messages({notUnique: "不能插入重复的值"});
