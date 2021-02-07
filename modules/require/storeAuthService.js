  function findUser(login, password, successCb, errorCb) {
    var users = kony.store.getItem("users") || [];
    var currentUser = users.find(function(user) {
      return user.login === login && user.password === password;
    });
    if (currentUser) {
      successCb(currentUser);
    } else {
      errorCb();
    }
  }

  function validateNewUser(users, newUser) {
    function checkId(user) {
      return user.id === newUser.Id;
    }

    function checkLogin(user) {
      return user.login === newUser.login;
    }

    function checkEmail(user) {
      return user.email === newUser.email;
    }

    var error;
    switch (true) {
      case (users.some(checkId)): {
        error = 'User with such id already exist';
        break;
      }
      case (users.some(checkLogin)): {
        error = 'User with such login already exist';
        break;
      }
      case (users.some(checkEmail)): {
        error = 'User with such email alreay exist';
        break;
      }
      default:
        error = null;
    }
    return error;
  }

  function registerUser(newUser, successCb, errorCb) {
    var users = kony.store.getItem('users') || [];
    var validationMistake = validateNewUser(users, newUser);
    if (validationMistake) {
      errorCb(validationMistake);
    } else {
      users.push(newUser);
      kony.store.setItem('users', users);
      successCb(newUser);
    }
  }

define(function () {
    return {
      findUser: findUser,
      registerUser: registerUser,
    };
});