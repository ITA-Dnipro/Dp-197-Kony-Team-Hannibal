function getUniqId() {
  return new Date().getTime();
}

function validateUserData(userData) {
  var err;
  switch (true) {
    case (!/[a-zA-Z]+ [a-zA-Z]+/.test(userData.fullName)): {
      err = 'User full name must include only letters and only one space between words';
      break;
    }
    case (!/\S+@[a-z]+\.[a-z]{2,3}/.test(userData.email)): {
      err = 'Email must be valid';
      break;
    }
    case (!/\S{3,8}/.test(userData.login)): {
      err = 'User login must not include spaces and contain at least 5 symbols';
      break;
    }
    case (!/\S{6,}/.test(userData.password)): {
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
     this.view.btnCancel.onClick = navigateToForm.bind(null, 'formAuthentication');
   },

   onErr: function(err) {
     alert(err);
   },
    
   onSuccess: function(user) {
     UserProfile = user;
     alert(UserProfile);
     //navigateToForm('formNewsProviders');
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
       this.onErr(err);
     } else {
       delete userData.passwordConfirm;
       userData.id = getUniqId();
       authService.registerUser(userData, this.onSuccess.bind(this), this.onErr.bind(this));
     }
   }
 };
});