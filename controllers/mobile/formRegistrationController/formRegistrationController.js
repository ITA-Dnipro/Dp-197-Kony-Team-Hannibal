function getUniqId() {
  return new Date().getTime();
}

function validateUserData(userData) {
  var err;
  switch (true) {
    case (!/[a-zA-Z]+ [a-zA-Z]+/.test(userData.fullName)): {
      err = 'User name must include only letters';
      break;
    }
    case (!/\S+@[a-z]+\.[a-z]{2,3}/.test(userData.email)): {
      err = 'Email must be valid';
      break;
    }
    case (!/\S{5,}/.test(userData.login)): {
      err = 'User login must not include spaces and contain at least 5 symbols';
      break;
    }
    case (userData.password.length < 6): {
      err = 'Password must include at least 6 symbols';
      break;
    }
    case (userData.password !== userData.passwordConfirm): {
      err = 'Password and password confirmation must match';
      break;
    }
    default:
      err = null;
  }
  return err;
}

define(['authenticationService'], function(authService) { 
  return {
   initForm: function() {
     this.view.btnSuccess.onClick = this.createNewUser.bind(this);
     this.view.btnCancel.onClick = function() {
       navigateToForm('formResult');
     };
   },

   showErr: function(err) {
     alert(err);
   },
    
   showSuccess: function(user) {
     alert(user);
   },

   createNewUser: function createNewUser() {
     var userData = {
       fullName: this.view.inputFullName.text || '',
       email: this.view.inputEmail.text || '',
       login: this.view.inputLogin.text || '',
       password: this.view.inputPassword.text || '',
       passwordConfirm: this.view.inputConfirmPassword.text || '',
     };
     var err = validateUserData(userData);
     if (err) {
       this.showErr(err);
     } else {
       delete userData.passwordConfirm;
       userData.id = getUniqId();
       authService.registerUser(userData, this.showSuccess.bind(this), this.showErr.bind(this));
     }
   }
 };
});