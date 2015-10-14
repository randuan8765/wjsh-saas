Template.orderNew.helpers({
  storeClasses: function () {
    return StoreClasses.find();
  },
  order: function() {
    return Session.get("currentOrder");
  },
  items: function() {
    if(!Session.get("currentOrder")) {
      return [];
    }
    return Session.get("currentOrder").items;
  },
  pairToString: function(obj) {
    var str = "";
    for(var key in obj) {
      if(obj[key]) {
        str += key + "、"
      }
    }
    console.log(str);
    if(str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  },
  pairsToString: function(obj, obj1, obj2) {
    var str = "";
    for(var key in obj) {
      if(obj[key]) {
        str += key + "、"
      }
    }
    if(obj1) {
      for(var key in obj1) {
        if(obj1[key]) {
          str += key + "、"
        }
      }
    }
    if(obj2) {
      for(var key in obj2) {
        if(obj2[key]) {
          str += key + "、"
        }
      }
    }
    if(str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  },
  discountPrice: function(original, discount) {
    return (original * discount).toFixed(2);
  },
  addOne: function(num) {
    return num + 1;
  },
  storeCustomer: function() {
    if(Session.get("currentOrder") && Session.get("currentOrder").customer) {
      var customer = Session.get("currentOrder").customer;
      if(customer.name) {
        return customer.mobile
         + '('
         + customer.name
         + ((customer.gender && (customer.gender == 'male')) ? '先生':'女士')
         + ')';
      } else {
        return customer.mobile;
      }
      return Session.get("currentOrder").customer.mobile;
    }
    return '客户';
  },
  orderPrice: function() {
    if(Session.get("currentOrder") && Session.get("currentOrder").items) {
      var items = Session.get("currentOrder").items;
      var price = 0;
      _.each(items, function(item) {
        if(item.discount) {
          price += Number((item.business.price * item.discount).toFixed(2));
        } else {
          price += item.business.price;
        }
      });
      return price;
    }
    return 0;
  },
  isReturnedToStore: function() {
    var flag = false;
    _.each(Session.get("currentOrder").items, function(item) {
      if(item.status == "returnedToStore") {
        flag = true;
      }
    });
    return flag;
  },
  clickedMarkButton: function() {
    return Session.get("clickedMarkButton");
  },
  readyToReturnCCount: function() {
    if(!Session.get('readyToReturnC')) {
      var itemIds = {};
      _.each(Session.get("currentOrder").items, function(item) {
        if(item.status == "returnedToStore") {
          itemIds[item._id] = true;
        }
      });
      Session.set('readyToReturnC', itemIds);
    }
    console.log(Session.get('readyToReturnC'));
    return _.keys(Session.get('readyToReturnC')).length;
  },
  inStore: function(itemId) {
    console.log(itemId);
    return Items.findOne(itemId).status=='returnedToStore';
  },
  finish: function(itemId) {
    console.log(itemId);
    return Items.findOne(itemId).status=='finish';
  },
  check: function(item) {
    console.log(Session.get('readyToReturnC'));
    console.log(item._id);
    console.log(Session.get('readyToReturnC')[item._id]);
    return Session.get('readyToReturnC')[item._id];
  }
});

Template.orderNew.events({
  'click .create-new-item': function (event, template) {
    IonModal.open('itemNew', {class: this});
    IonModal.open('itemChooseBusiness', {storeClassBusinesses: StoreBusinesses.find({storeClassId: event.currentTarget.id})});
  },
  'click .selected-item-row': function (event, template) {
    console.log(Session.get("currentOrder"));
    console.log(this.index);
    this.item.updateIndex = this.index;
    Session.set("currentItem", this.item);

    var storeClassId = this.item.business.storeClassId;
    IonModal.open('itemNew', {class: StoreClasses.findOne(storeClassId), update: true});
  },
  'click [type=submit]': function (event, template) {
    if(!Session.get("currentOrder") || Session.get("currentOrder").items.length == 0) {
      console.log('zero');
      Session.set("currentOrder", undefined);
      IonModal.close('orderNew');
      return ;
    }
    // var str = '';
    // _.each(Session.get("currentOrder").items, function(item) {
    //   str += item.name + " ("
    // });
    //计算价格
    var items = Session.get("currentOrder").items;
    var price = 0;
    _.each(items, function(item) {
      if(item.discount) {
        console.log((price * item.discount).toFixed(2));
        price += Number((item.business.price * item.discount).toFixed(2));
        console.log(price);
      } else {
        price += item.business.price;
        console.log(price);
      }
    });

    IonPopup.confirm({
      title: '创建订单',
      template: '确认已收款' + price + '元，并<strong>创建</strong>这个新订单吗?',
      cancelText: '取消',
      okText: 'OK',
      onOk: function() {
        Meteor.call("Orders.create", Session.get("currentOrder"));
        Session.set("currentOrder", undefined);
        IonModal.close('orderNew');
      },
      onCancel: function() {
        console.log('取消');
      }
    });
  },
  'click .bind-customer': function(event, template) {
    IonModal.open('customerBind');
  },
  'click .mark-done': function(event, template) {
    console.log('mark-done');
    Session.set("clickedMarkButton", true);
  },
  'click .check-icon': function(event, template) {
    console.log(this);
    console.log(Session.get("readyToReturnC"));
    var readyToReturnC = Session.get("readyToReturnC");
    if(readyToReturnC[this._id]) {
      delete readyToReturnC[this._id];
    } else {
      readyToReturnC[this._id] = true;
    }
    Session.set("readyToReturnC", readyToReturnC);
    console.log(Session.get("readyToReturnC"));
  },
  'click .mark-submit': function(event, template) {
    console.log(Session.get("readyToReturnC"));
    var readyToReturnC = Session.get("readyToReturnC");
    if(_.keys(readyToReturnC) == 0) {
      Session.set("readyToReturnC", undefined);
      Session.set("clickedMarkButton", undefined);
      Session.set("currentOrder", undefined);
      IonModal.close('orderNew');
    } else {
      IonPopup.confirm({
        title: '标记为已取',
        template: '确认要将这些订单修改为<strong>客户已取</strong>的状态吗?',
        cancelText: '取消',
        okText: 'OK',
        onOk: function() {
          Meteor.call("Items.markFinish", _.keys(readyToReturnC));
          Session.set("readyToReturnC", undefined);
          Session.set("clickedMarkButton", undefined);
          Session.set("currentOrder", undefined);
          IonModal.close('orderNew');
        },
        onCancel: function() {
          console.log('取消');
        }
      });

    }
  },
  'click [data-dismiss=modal]': function (event, template) {
    Session.set("readyToReturnC", undefined);
    Session.set("clickedMarkButton", undefined);
    Session.set("currentOrder", undefined);
    IonModal.close('orderNew');
  },
});
