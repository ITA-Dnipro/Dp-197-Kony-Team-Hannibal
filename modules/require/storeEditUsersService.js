

define(function () {
  
  function validateUserData(userData, users) {

    var err = null;
    switch (true) {
      case (!/[a-zA-Z]+ [a-zA-Z]+/.test(userData.fullName)): {
        err = 'User full name must include only letters and only one space between words';
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
      case (!/\S{6,}/.test(userData.password)): {
        err = 'Password must include at least 6 symbols';
        break;
      }
      case (userData.password !== userData.passwordConfirm): {
        err = 'Password and password confirmation must match';
        break;
      }

    }
    users.forEach(function(item) {
      if(item.id !== userData.id) {
        if(item.email === userData.email) {
          err = 'User with such email alreay exist';
        }
        if (item.login === userData.login) {
          err = 'User with such login already exist';
        }
      }
    });
     return err;
  }
  
    function editUser(newUser, successCb, errorCb) {
    var users = kony.store.getItem("usersArray");
    var validationMistake = validateUserData(newUser, users);
    if (validationMistake) {
      errorCb(validationMistake);
    } else {
      delete newUser.passwordConfirm;
      var userIdx = users.findIndex(function(item) {
        return item.id === newUser.id;
      });
      users.splice(userIdx, 1, newUser);
      kony.store.setItem("usersArray", users);
      successCb(newUser);

    }
  }
   
    return {
        editUser: editUser
    };
});