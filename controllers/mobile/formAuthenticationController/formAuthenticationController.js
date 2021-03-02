define(['authenticationService', 'resourcesService', 'articleService', 'utils'], function (authService, resourcesService, articleService, utils) { 
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
    initUser: function(userData) {
      resourcesService.getUserResources(userData.id, function (userResources) {
        appStorage.userId = userData.id;
        appStorage.userProfile.fullName = userData.fullName;
        appStorage.userProfile.login = userData.login;
        appStorage.userProfile.mail = userData.email;
        appStorage.userResources = userResources;
        alert(appStorage.userProfile, appStorage.userResources);
        utils.navigateToForm('formNewsProviders');
      }, this.onErr);
      articleService.getUserArticles(userId, function(articles) {
        appStorage.articles = articles;
        alert(appStorage.articles);
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