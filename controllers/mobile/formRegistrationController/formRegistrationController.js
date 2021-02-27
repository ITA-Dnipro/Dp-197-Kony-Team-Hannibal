define(['authenticationService', 'resourcesService', 'utils'], function(authService, resourcesService, utils) {
  function clearFields() {
    this.view.inputFullName.text = '';
    this.view.inputEmail.text = '';
    this.view.inputLogin.text = '';
    this.view.inputPassword.text = '';
    this.view.inputConfirmPassword.text = '';
  }
  
  return {
   initForm: function() {
     this.view.onHide = clearFields.bind(this);
     this.view.btnSuccess.onClick = this.createNewUser.bind(this);
     this.view.btnCancel.onClick = utils.navigateToForm.bind(null, 'formAuthentication');
   },

   onErr: function(err) {
     alert(err);
   },
    
   initializeUser: function(userId) {
     resourcesService.addStartResources(userId, function() {
       utils.navigateToForm('formAuthentication');
     }, this.onErr);
   },

   createNewUser: function createNewUser() {
     var userData = {
       fullName: this.view.inputFullName.text || '',
       email: this.view.inputEmail.text || '',
       login: this.view.inputLogin.text || '',
       password: this.view.inputPassword.text || '',
       passwordConfirm: this.view.inputConfirmPassword.text || '',
     };
     var err = utils.validateUserData(userData);
     if (err) {
       this.onErr(err);
     } else {
       delete userData.passwordConfirm;
       authService.registerUser(userData, this.initializeUser, this.onErr);
     }
   }
 };
});