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


    negativeValidation: false,
    negativeFeedback: false,
    positiveValidation: false,
    positiveFeedback: false,

    texts: {
      title: {
        changePwd: "Password Title",
        enrollAccount: "Enroll Title",
        forgotPwd: "Forgot Pwd Title",
        resetPwd: "Reset Pwd Title",
        signIn: "Sign In Title",
        signUp: "Sign Up Title",
        verifyEmail: "Verify Email Title",
      }
    },

    texts: {
        button: {
          changePwd: "Password Text",
          enrollAccount: "Enroll Text",
          forgotPwd: "Forgot Pwd Text",
          resetPwd: "Reset Pwd Text",
          signIn: "Sign In Text",
          signUp: "注册",
        }
    },

    texts: {
        errors: {
            accountsCreationDisabled: "Client side accounts creation is disabled!!!",
            cannotRemoveService: "Cannot remove the only active service!",
            captchaVerification: "Captcha verification failed!",
            loginForbidden: "error.accounts.Login 被禁",
            mustBeLoggedIn: "error.accounts.Must be logged in",
            pwdMismatch: "error.pwdsDontMatch",
            validationErrors: "Validation Errors",
            verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",
        }
    },
    onSubmitHook: function(error, state) {
      if (!error) {
        if (state === "signIn") {
          // Successfully logged in
          // ...

        }
        if (state === "signUp") {
          // Successfully registered
          // ...
        }
        Meteor.subscribe("store", {
          onReady: function() {alert(1)}
        });
        alert(2);
      }
    },
    onSubmitHook: function(error, state) {
      if (!error) {
        IonModal.close('signUp');
        if (state === "signIn") {
          // Successfully logged in
          // ...

        }
        if (state === "signUp") {
          // Successfully registered
          // ...
        }
        alert(Meteor.user().profile.verificationCode);
      }
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
      minLength: 11,
  },
  {
      _id: "verificationCode",
      type: "text",
      displayName: "验证码",
      placeholder: "请输入验证码",
      required: true,
      minLength: 4,
  },
  pwd
]);
