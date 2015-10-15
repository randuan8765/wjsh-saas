// Options
AccountsTemplates.configure({
    //defaultLayout: 'emptyLayout',

    overrideLoginErrors: true,

    //enforceEmailVerification: true,
    //confirmPassword: true,
    //continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: false,
    //formValidationFeedback: true,
    //homeRoutePath: '/',
    //showAddRemoveServices: false,
    //showPlaceholders: true,
    // showForgotPasswordLink: true,


    negativeValidation: false,
    negativeFeedback: false,
    positiveValidation: false,
    positiveFeedback: false,

    texts: {
      minRequiredLength: "要求的最小长度",
      requiredField: "必填项",
    },
    onSubmitHook: function(error, state) {
      if (!error) {
        // IonModal.close('signUp');
        if (state === "signIn") {
          // Successfully logged in
          // ...
          Meteor.defer(function(){
            Router.go(Session.get('urlBeforeLogin'));
          });
        }
        if (state === "signUp") {
          // Successfully registered
          // ...
          Meteor.defer(function(){
            Router.go(Session.get('urlBeforeLogin'));
          });
        }

      }
    },
    preSignUpHook: function(password, info) {
      info.profile.phase = "1";
    }
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "tel",
      displayName: "手机号",
      placeholder: "请输入手机号",
      required: true,
      // minLength: 11,
      // maxLength: 11,
      errStr: '请输入11位手机号',
      re: /[0-9]{11}/
  },
  // {
  //     _id: "verificationCode",
  //     type: "text",
  //     displayName: "验证码",
  //     placeholder: "请输入验证码",
  //     required: true,
  //     minLength: 4,
  // },
  pwd
]);
