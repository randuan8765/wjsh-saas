// Meteor.startup(function () {
//
//   var factories = [
//     {
//       key: '02', //我们现在用的 //compose index //unique
//       name: '能匠',
//       simpleName: '能匠',
//       address: {
//         full: '北京市海淀区',
//       },
//       contacts: [{name: "王老板", mobileNum: "18701001961"}],
//       business: [
//         {
//           id: 1,
//           name: "清洗运动鞋",
//           price: 5.5,
//           class: 'shoe', //compose index
//           description: "板鞋、帆布鞋、旅游鞋、拖鞋、布鞋"
//         },
//         {
//           id: 2,
//           name: "清洗绒面鞋",
//           price: 11,
//           class: 'shoe',
//           description: "绒面运动鞋、绒面休闲鞋"
//         },
//         {
//           id: 3,
//           name: "翻新鞋",
//           price: 30,
//           class: 'shoe',
//           description: "皮鞋、翻毛皮鞋、鹿皮鞋"
//         },
//         {
//           id: 4,
//           name: "清洗小包",
//           price: 30,
//           class: 'leatherware',
//           description: "钱包、手包；皮具、布类"
//         }
//       ],
//       createdAt: new Date()
//     },
//     {
//       key: '03', //我们现在用的 //compose index
//       name: '自由神',
//       simpleName: '自由神',
//       address: {
//         full: '天津市静海区',
//       },
//       contacts: [{name: '王老板', mobileNum: '18701001962'}],
//       business: [
//         {
//           id: 1,
//           name: "清洗运动鞋",
//           price: 6,
//           // class: 'shoe', //compose index
//           description: "板鞋、帆布鞋、旅游鞋、拖鞋、布鞋"
//         },
//         {
//           id: 2,
//           name: "清洗绒面鞋",
//           price: 8,
//           // class: 'shoe',
//           description: "绒面运动鞋、绒面休闲鞋"
//         },
//         {
//           id: 3,
//           name: "翻新鞋",
//           price: 30,
//           // class: 'shoe',
//           description: "皮鞋、翻毛皮鞋、鹿皮鞋"
//         },
//         {
//           id: 4,
//           name: "清洗小包",
//           price: 30,
//           // class: 'leatherware',
//           description: "钱包、手包；皮具、布类"
//         }
//       ],
//       createdAt: new Date()
//     }
//   ];
//   var areas = [
//     {
//       key: '120104001000', //我们现在用的 //compose index //unique
//       name: '长虹街道',
//       district: '南开区',
//       city: '天津市',
//       preManager: [{name: "段然1", mobileNum: "18701001961"}],
//       postManager: [{name: "段然2", mobileNum: "18701001961"}],
//       business: [
//         {
//           id: '02_1',
//           name: '清洗运动鞋',
//           price: 6,
//           class: 'shoe', //compose index
//           description: "板鞋、帆布鞋、旅游鞋、拖鞋、布鞋" //待定
//         },
//         {
//           id: '02_2',
//           name: "清洗绒面鞋",
//           price: 11,
//           class: 'shoe',
//           description: "绒面运动鞋、绒面休闲鞋"
//         },
//         {
//           id: '02_3',
//           name: "翻新鞋",
//           price: 30,
//           class: 'shoe',
//           description: "皮鞋、翻毛皮鞋、鹿皮鞋"
//         },
//         {
//           id: '02_4',
//           name: "清洗小包",
//           price: 30,
//           class: 'leatherware',
//           description: "钱包、手包；皮具、布类"
//         }
//       ],
//       createdAt: new Date()
//     }
//   ];
//
//   if (Factories.find().count() === 0) {
//     _(factories).each(function (factory) {
//       Factories.insert(factory);
//     });
//   }
//   if (Areas.find().count() === 0) {
//     _(areas).each(function (area) {
//       Areas.insert(area);
//     });
//   }
// });
