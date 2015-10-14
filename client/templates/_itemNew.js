Template.itemNew.helpers({
  selectedItemBusiness: function() {
    return Session.get("currentItem") ? Session.get("currentItem").business : Session.get("currentItem");
  },
  hasSelectedItemBusiness: function() {
    return Session.get("currentItem") && Session.get("currentItem").business;
  },
  selectedItemDiscount: function() {
    if(!Session.get("currentItem") || !Session.get("currentItem").discount) {
      return "";
    }
    var discount = Session.get("currentItem").discount*10;
    return (discount%1==0?discount:discount*10)+'折' + '(' + (Session.get("currentItem").business.price * discount * 0.1).toFixed(2) + '元)';
  },
  selectedFlaws: function() {
    if(!Session.get("currentItem") || !Session.get("currentItem").flaws) {
      return [];
    }
    var str = "";
    var flaws = Session.get("currentItem").flaws;
    for(var key in flaws) {
      if(flaws[key]) {
        str += key + "、"
      }
    }
    if(str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  },
  selectedFlawsCount: function() {
    if(!Session.get("currentItem") || !Session.get("currentItem").flaws) {
      return 0;
    }
    var tmp = _.filter(Session.get("currentItem").flaws, function(value){
      return value;
    });
    return tmp.length;
  },
  selectedColors: function() {
    if(!Session.get("currentItem") || !Session.get("currentItem").colors) {
      return [];
    }
    var str = "";
    var colors = Session.get("currentItem").colors;
    for(var key in colors) {
      if(colors[key]) {
        str += key + "、"
      }
    }
    if(str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  },
  selectedColorsCount: function() {
    if(!Session.get("currentItem") || !Session.get("currentItem").colors) {
      return 0;
    }
    var tmp = _.filter(Session.get("currentItem").colors, function(value){
      return value;
    });
    return tmp.length;
  },
  selectedEffects: function() {
    if(!Session.get("currentItem") || !Session.get("currentItem").effects) {
      return [];
    }
    var str = "";
    var effects = Session.get("currentItem").effects;
    for(var key in effects) {
      if(effects[key]) {
        str += key + "、"
      }
    }
    if(str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  },
  selectedEffectsCount: function() {
    if(!Session.get("currentItem") || !Session.get("currentItem").effects) {
      return 0;
    }
    var tmp = _.filter(Session.get("currentItem").effects, function(value){
      return value;
    });
    return tmp.length;
  },
  selectedAccessories: function() {
    if(!Session.get("currentItem") || !Session.get("currentItem").accessories) {
      return [];
    }
    var str = "";
    var accessories = Session.get("currentItem").accessories;
    for(var key in accessories) {
      if(accessories[key]) {
        str += key + "、"
      }
    }
    if(str.length > 0) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  },
  selectedAccessoriesCount: function() {
    if(!Session.get("currentItem") || !Session.get("currentItem").accessories) {
      return 0;
    }
    var tmp = _.filter(Session.get("currentItem").accessories, function(value){
      return value;
    });
    return tmp.length;
  }
});

Template.itemNew.events({
  'click .item-color': function (event, template) {
    event.preventDefault();
    template.find('.must-choose-color-message').style.display = 'none';
    if(Session.get("currentItem") && !Session.get("currentItem").colors) {

      // 一个storeBusiness可能对应多个areaBusiness
      var areaBusinessIds = StoreBusinesses.findOne(Session.get("currentItem").business._id).areaBusinessIds;

      //将多个storeBusiness转化找到distinct classIds
      var areaBusinesses = AreaBusinesses.find({ _id: { $in: areaBusinessIds } }).fetch();
      var tmpArray = _.uniq(areaBusinesses, false, function(d) {return d.classId});
      var distinctClassIds = _.pluck(tmpArray, 'classId');

      //将去重后的classIds转化成去重后的瑕疵名对象{“变色”:false,”磨损“：false，。。。}
      var colorsList = _.map(distinctClassIds, function(classId) {
        return Classes.findOne(classId).colors;
      });
      var distinctColors = _.union.apply(_, colorsList);
      var colorMap = _.map(distinctColors, function(color) {
        return [color,false];
      });
      var currentItem = Session.get("currentItem");
      currentItem.colors = _.object(colorMap);
      Session.set("currentItem", currentItem);
    } else {
      Session.set("colorTmp", Session.get("currentItem").colors);
    }
    IonModal.open('itemChooseColor');
  },
  'click .item-flaw': function (event, template) {
    event.preventDefault();
    if(Session.get("currentItem") && !Session.get("currentItem").flaws) {

      // 一个storeBusiness可能对应多个areaBusiness
      var areaBusinessIds = StoreBusinesses.findOne(Session.get("currentItem").business._id).areaBusinessIds;

      //将多个storeBusiness转化找到distinct classIds
      var areaBusinesses = AreaBusinesses.find({ _id: { $in: areaBusinessIds } }).fetch();
      var tmpArray = _.uniq(areaBusinesses, false, function(d) {return d.classId});
      var distinctClassIds = _.pluck(tmpArray, 'classId');

      //将去重后的classIds转化成去重后的瑕疵名对象{“变色”:false,”磨损“：false，。。。}
      var flawsList = _.map(distinctClassIds, function(classId) {
        return Classes.findOne(classId).flaws;
      });
      var distinctFlaws = _.union.apply(_, flawsList);
      var flawMap = _.map(distinctFlaws, function(flaw) {
        return [flaw,false];
      });
      var currentItem = Session.get("currentItem");
      currentItem.flaws = _.object(flawMap);
      Session.set("currentItem", currentItem);
    } else {
      Session.set("flawTmp", Session.get("currentItem").flaws);
    }
    IonModal.open('itemChooseFlaw');
  },
  'click .item-effect': function (event, template) {
    event.preventDefault();
    if(Session.get("currentItem") && !Session.get("currentItem").effects) {

      // 一个storeBusiness可能对应多个areaBusiness
      var areaBusinessIds = StoreBusinesses.findOne(Session.get("currentItem").business._id).areaBusinessIds;

      //将多个storeBusiness转化找到distinct classIds
      var areaBusinesses = AreaBusinesses.find({ _id: { $in: areaBusinessIds } }).fetch();
      var tmpArray = _.uniq(areaBusinesses, false, function(d) {return d.classId});
      var distinctClassIds = _.pluck(tmpArray, 'classId');

      //将去重后的classIds转化成去重后的瑕疵名对象{“变色”:false,”磨损“：false，。。。}
      var effectsList = _.map(distinctClassIds, function(classId) {
        return Classes.findOne(classId).effects;
      });
      var distinctEffects = _.union.apply(_, effectsList);
      var effectMap = _.map(distinctEffects, function(effect) {
        return [effect,false];
      });
      var currentItem = Session.get("currentItem");
      currentItem.effects = _.object(effectMap);
      Session.set("currentItem", currentItem);
    } else {
      Session.set("effectTmp", Session.get("currentItem").effects);
    }
    IonModal.open('itemChooseEffect');
  },
  'click .item-accessory': function (event, template) {
    event.preventDefault();
    if(Session.get("currentItem") && !Session.get("currentItem").accessories) {

      // 一个storeBusiness可能对应多个areaBusiness
      var areaBusinessIds = StoreBusinesses.findOne(Session.get("currentItem").business._id).areaBusinessIds;

      //将多个storeBusiness转化找到distinct classIds
      var areaBusinesses = AreaBusinesses.find({ _id: { $in: areaBusinessIds } }).fetch();
      var tmpArray = _.uniq(areaBusinesses, false, function(d) {return d.classId});
      var distinctClassIds = _.pluck(tmpArray, 'classId');

      //将去重后的classIds转化成去重后的瑕疵名对象{“变色”:false,”磨损“：false，。。。}
      var accessoriesList = _.map(distinctClassIds, function(classId) {
        return Classes.findOne(classId).accessories;
      });
      var distinctAccessories = _.union.apply(_, accessoriesList);
      var accessoryMap = _.map(distinctAccessories, function(accessory) {
        return [accessory,false];
      });
      var currentItem = Session.get("currentItem");
      currentItem.accessories = _.object(accessoryMap);
      Session.set("currentItem", currentItem);
    } else {
      Session.set("accessoryTmp", Session.get("currentItem").accessories);
    }
    IonModal.open('itemChooseAccessory');
  },
  'click [data-dismiss=modal]': function (event, template) {
    Session.set("currentItem", undefined);
    if(!Session.get("currentOrder")) {
      IonModal.close('orderNew');
    }
  },
  'click [type=submit]': function (event, template) {
    console.log('submit');
    console.log(Session.get("currentItem"));
    // console.log(Session.get("currentItem").business);
    if(!Session.get("currentItem") || !Session.get("currentItem").business) {
      console.log('why here?');
      template.find('.must-choose-business-message').style.display = 'block';
      return ;
    }
    console.log('should here!');
    if(!Session.get("currentItem").colors) {
      console.log('no color!');
      template.find('.must-choose-color-message').style.display = 'block';
      return ;
    } else {
      var tmp = _.filter(Session.get("currentItem").colors, function(value){
        return value;
      });
      console.log(tmp.length);
      if(tmp.length == 0) {
        template.find('.must-choose-color-message').style.display = 'block';
        return ;
      }
    }

    if(!Session.get("currentOrder")) {
      Session.set("currentOrder", {items: []});
    }
    console.log(Session.get("currentItem"));

    var currentOrder = Session.get("currentOrder");
    currentOrder.items.push(Session.get("currentItem"));
    Session.set("currentOrder", currentOrder);
    Session.set("currentItem", undefined);
    IonModal.close('itemNew');
  },
  'click .item-business': function (event, template) {
    event.preventDefault();
    template.find('.must-choose-business-message').style.display = 'none';
    IonModal.open('itemChooseBusiness', {storeClassBusinesses: StoreBusinesses.find({storeClassId: event.currentTarget.id})})
  },
  'click .item-discount': function(event, template) {
    event.preventDefault();
    IonModal.open('itemChooseDiscount');
  },

  'click .button-update': function (event, template) {

    if(!Session.get("currentItem") || !Session.get("currentItem").business) {
      template.find('.must-choose-business-message').style.display = 'block';
      return ;
    }
    //判断颜色不能为空
    if(!Session.get("currentItem").colors) {
      template.find('.must-choose-color-message').style.display = 'block';
      return ;
    } else {
      var tmp = _.filter(Session.get("currentItem").colors, function(value){
        return value;
      });
      if(tmp.length == 0) {
        template.find('.must-choose-color-message').style.display = 'block';
        return ;
      }
    }

    if(!Session.get("currentOrder")) {
      IonModal.close('itemNew');
      IonModal.close('orderNew');
      return ;
    }

    var currentOrder = Session.get("currentOrder");
    var updateIndex = Session.get("currentItem").updateIndex;
    var currentItem = Session.get("currentItem");
    delete currentItem.updateIndex;
    currentOrder.items[updateIndex] = currentItem;
    Session.set("currentOrder", currentOrder);
    Session.set("currentItem", undefined);
    IonModal.close('itemNew');
  },
  'click .button-delete': function (event, template) {
    IonPopup.confirm({
      title: '删除',
      template: '您确定<strong>删除</strong>吗?',
      cancelText: '取消',
      okText: 'OK',
      onOk: function() {
        console.log('delete');
        console.log(Session.get("currentItem"));

        if(!Session.get("currentOrder")) {
          IonModal.close('itemNew');
          IonModal.close('orderNew');
          return ;
        }

        var currentOrder = Session.get("currentOrder");
        var updateIndex = Session.get("currentItem").updateIndex;

        currentOrder.items.splice(updateIndex, 1);
        Session.set("currentOrder", currentOrder);
        Session.set("currentItem", undefined);

        console.log(Session.get("currentOrder"));
        IonModal.close('itemNew');
        if(currentOrder.items.length == 0) {
          console.log('zero');
          Session.set("currentOrder", undefined);
          IonModal.close('orderNew');
        }
      },
      onCancel: function() {
        console.log('取消');
      }
    });

  },
});
