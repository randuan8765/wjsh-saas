Template.storeBusinessAreaBusinesses.helpers({
  areaBusinesses: function () {
    var areaBusinessIds = StoreBusinesses.findOne({_id: Router.current().params._id}).areaBusinessIds;
    console.log(areaBusinessIds);

    var areaBusinesses = AreaBusinesses.find({_id: { $in: areaBusinessIds }});
    console.log(areaBusinessIds);

    return areaBusinesses;
  },

});
