define(function () {
  
 var client = kony.sdk.getCurrentInstance();
 var integrationSvc = client.getIntegrationService('MySQLService');
  
 function validateUserDataForUpdate(userData) {
  var err;
  switch (true) {
    case (!/[a-zA-Z]+ [a-zA-Z]+/.test(userData.fullName)): {
      err = 'User full name must include only letters and only one space between words';
      break;
    }
    case (!/\S+@[a-z]+\.[a-z]{2,3}/.test(userData.mail)): {
      err = 'Email must be valid';
      break;
    }
    case (!/\S{3,8}/.test(userData.login)): {
      err = 'User login must not include spaces and contain at least 5 symbols';
      break;
    }
    default:
      err = null;
  }
  return err;
}
  
 function validateUserPassword(pswData) {
         var err;
      switch (true) {
        case (!/\S{6,}/.test(pswData.newPsw)): {
          err = 'Password must include at least 6 symbols';
          break;
        }
        case (pswData.newPsw !== pswData.confirmPsw): {
          err = 'Password and password confirmation must match';
          break;
        }
        default:
          err = null;
      }
      return err;
 } 

   
 function editUser(newData, succesCb, errorCb) {
  var err = validateUserDataForUpdate(newData);
    if (err) {
      errorCb(err);
    } else {
      var headers = null;
      var body = { 
        userId: newData.id, 
        userFullName: newData.fullName,
        userEmail: newData.mail,
        userLogin: newData.login 
      };      
      integrationSvc.invokeOperation('updateUserProfile', headers, body, function(response) {
        if(response.userUpdateResult === "success") {
          succesCb(new UserProfileDataModel(newData.fullName, newData.mail, newData.login));
        } else {
          errorCb(response.userUpdateResult);
        }
     }, function(error) {
        errorCb(error);
      });      
    }
  }
  
  function getUserProfileData(userId, successCb, errorCb) {
    integrationSvc.invokeOperation('getUserProfile', null, {userId: userId}, function(response) {
      if(response.userProfileError) {
        errorCb(response);
      } else {
        successCb(response);
      }
    }, function(error) {
      errorCb(error);
    });
  }
  
  function changePassword(pswData, successCb, errorCb) {
    var err = validateUserPassword(pswData);
    if(err) {
      alert(err);
    } else {
      integrationSvc.invokeOperation('changePassword', null, pswData, function(response) {
        if(response.changePswRes === "change_success") {
          successCb();
        } else {
          errorCb();
        }
      });
    }
    
  }
  

  
    return {
        editUser: editUser,
        getUserProfileData: getUserProfileData,
        changePassword: changePassword,
    };
});