AutoForm.hooks({
  'storeBusiness-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      //Router.go('classes.businesses', {_id: result});
    },

    onError: function(operation, error, template) {
      alert(error);
    }
  }
});
