define(['authenticationService'], function (authService) { 
  function validateUserCredentials(login, password) {
    var err;
    switch (true) {
      case (!/\S{5,}/.test(login)): {
        err = 'User login must not include spaces and contain at least 5 symbols';
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
    successCb: function(user) {
      alert('Authorization completed successfully. user: ' + user);
    },
    
    showErr: function(err) {
      alert(err);
    },
    
   loginUser: function() {
     var login = this.view.inputLogin.text || '';
     var password = this.view.inputPassword.text || '';
     var err = validateUserCredentials(login, password);
     if (err) {
       this.showErr(err);
     } else {
       authService.findUser(login, password, this.successCb.bind(this), this.showErr.bind(this));
     }
   },

   initForm: function () {
     this.view.onHide = clearFields.bind(this);
     this.view.btnLogin.onClick = this.loginUser.bind(this);
     this.view.btnReg.onClick = function () {
       navigateToForm('formRegistration');
     };
   }
  }
 });