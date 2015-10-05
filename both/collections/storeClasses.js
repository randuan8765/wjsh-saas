// StoreClasses = new Mongo.Collection("storeClasses");

// StoreClasses.before.insert(function (userId, doc) {
//   doc.createdAt = new Date();
// });

// StoreClasses.attachSchema(new SimpleSchema({
//   name: {
//     type: String,
//     label: "分类名称",
//   },
//   storeId: {
//     type: String,
//     autoValue: function () {
//       if (this.isSet) {
//         return;
//       }
//       if (this.isInsert) {
//         return Session.get("storeId");
//       } else {
//         this.unset();
//       }
//     }
//   },
//
// }));
