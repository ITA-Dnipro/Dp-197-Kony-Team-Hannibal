

define(['utils'], function (utils) {
  
  function validateUserData(userData, users) {
    var err = utils.validateUserData(userData);
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
    var users = kony.store.getItem("users");
    var validationMistake = validateUserData(newUser, users);
    if (validationMistake) {
      errorCb(validationMistake);
    } else {
      delete newUser.passwordConfirm;
      var userIdx = users.findIndex(function(item) {
        return item.id === newUser.id;
      });
      users.splice(userIdx, 1, newUser);
      kony.store.setItem("users", users);
      successCb(newUser);

    }
  }
   
    return {
        editUser: editUser,
    };
});