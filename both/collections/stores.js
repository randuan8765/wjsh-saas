Stores = new Mongo.Collection("stores");

// Stores.before.insert(function (userId, doc) {
//   doc.createdAt = new Date();
// });

// Schemas.Stores = new SimpleSchema({
//   creator: {//创建store的手机号
//     type: String,
//     index: 1,
//     unique: true
//   },
//   key: {
//     type: String,
//     label: "代码"
//   },
//   name: {
//     type: String,
//     label: "全称"
//   },
//   aliase: {
//     type: String,
//     label: "简称"
//   },
//   address: {
//     type: Object,
//     label: "地域信息",
//   },
//   'address.area': {//要在area里创建
//     type: String,
//     label: "所属区域编号",
//   },
//   'address.street': {
//     type: String,
//     label: "具体地址",
//   },
//   contacts: {
//     type: Array,
//     label: "门店联系人"
//   },
//   'contacts.$': {
//     type: Object,
//   },
//   'contacts.$.name': {
//     type: String,
//     label: "姓名",
//   },
//   'contacts.$.phone': {
//     type: String,
//     label: "手机号"
//   },
//   'contacts.$.title': {
//     type: String,
//     label: "职位/称号",
//     optional: true
//   },
//   // 'description': {
//   //   type: String,
//   //   label: "备注",
//   //   autoform: {
//   //      rows: 3
//   //   },
//   //   optional: true
//   // },
//   // 'registerFormId': {
//   //   type: String,
//   //   label: "申请表编号",
//   //   optional: true
//   // },
//   classes: {//由夫妻店用自己的saas client操作
//     type: Array,
//     label: "门店内部业务分类",
//     optional: true,
//     minCount: 1,
//     maxCount: 4
//   },
//   "classes.$": {
//     type: String
//   },
//   businesses: {//由夫妻店用自己的saas client操作
//     type: Array,
//     label: "门店内部价目表",
//     optional: true
//   },
//   'businesses.$': {
//     type: Object,
//   },
//   'businesses.$.name': {
//     type: String,
//     label: "名称",
//   },
//   'businesses.$.price': {
//     type: Number,
//     decimal: true,
//     autoform: {
//        step: "0.01"
//     },
//     label: "门店对外定价"
//   },
//   'businesses.$.class': {
//     type: String,
//     label: "业务类别（来自于门店定义的class）"
//   },
//   'businesses.$.order': {
//     type: Number,
//     label: "顺序"
//   },
//   'businesses.$.description': {
//     type: String,
//     label: "描述",
//     autoform: {
//        rows: 3
//     },
//     optional: true
//   },
// });
