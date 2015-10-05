// StoreBusinesses = new Mongo.Collection("storeBusinesses");

// StoreBusinesses.before.insert(function (userId, doc) {
//   doc.createdAt = new Date();
// });

// StoreBusinesses.attachSchema(new SimpleSchema({
//   name: {
//     type: String,
//     label: "业务名称",
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
//   classId: {
//     type: String,
//     autoValue: function () {
//       if (this.isSet) {
//         return;
//       }
//       if (this.isInsert) {
//         return Session.get("classId");
//       } else {
//         this.unset();
//       }
//     }
//   },
// }));
