StoreClasses = new Mongo.Collection("storeClasses");

StoreClasses.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

StoreClasses.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "分类名称",
  },
  // storeId: {
  //   type: String,
  //   autoValue: function () {
  //     if (this.isSet) {
  //       return;
  //     }
  //     if (this.isInsert) {
  //       return Meteor.userId();
  //     } else {
  //       this.unset();
  //     }
  //   }
  // },
  // flaws: {
  //   type: Array,
  //   label: "瑕疵"
  // },
  // 'flaws.$': {
  //   type: String,
  // },
  // effects: {
  //   type: Array,
  //   label: "洗后效果"
  // },
  // 'effects.$': {
  //   type: String,
  // },
  // accessories: {
  //   type: Array,
  //   label: "配件"
  // },
  // 'accessories.$': {
  //   type: String,
  // },
}));
