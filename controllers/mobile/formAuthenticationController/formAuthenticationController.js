define(['authenticationService', 'resourcesService', 'utils'], function (authService, resourcesService, utils) { 
  function validateUserCredentials(login, password) {
    var err;
    switch (true) {
      case (!/\S{3,8}/.test(login)): {
        err = 'User login mustn\'t include spaces and consists of at least 5 symbols';
        break;
      }
      case (!/\S{6,}/.test(password)): {
        err = 'Password must include at least 6 symbols';
        break;
      }
      default:
        err = null;
    }
    return err;
  }
  
  function clearFields() {
    this.view.inputLogin.text = '';
    this.view.inputPassword.text = '';
  }
  
  return {   
    initUser: function(userId) {
      resourcesService.getResources(userId, function (userResources) {
        appStorage.userId = userId;
        appStorage.userResources = userResources;
        utils.navigateToForm('formNewsProviders');
      }, this.onErr);
    },
    
    onErr: function(err) {
      alert(err);
    },
    
   loginUser: function() {
     var login = this.view.inputLogin.text || '';
     var password = this.view.inputPassword.text || '';
     var err = validateUserCredentials(login, password);
     if (err) {
       this.onErr(err);
     } else {
       authService.findUser(login, password, this.initUser, this.onErr);
     }
   },

   initForm: function () {
     this.view.onHide = clearFields.bind(this);
     this.view.btnLogin.onClick = this.loginUser.bind(this);
     this.view.btnReg.onClick = function () {
       utils.navigateToForm('formRegistration');
     };
   }
  };
 });