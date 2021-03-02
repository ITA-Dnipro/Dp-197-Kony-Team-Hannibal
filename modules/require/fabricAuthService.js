define(function () {
   var client = kony.sdk.getCurrentInstance();
   var integrationSvc = client.getIntegrationService('MySQLService');
  
   function findUser(login, password, successCb, errorCb) {
     integrationSvc.invokeOperation('loginUser', null, { userLogin: login, userPassword: password }, function(response) {
       if (response.userLoginError) {
         errorCb(response.userLoginError);
       } else {
         alert('login success');
         successCb(response.userId);
       }
     }, errorCb);
   }
  
   function registerUser(userData, successCb, errorCb) {
     var renamedData = {
       userFullName: userData.fullName,
       userEmail: userData.email,
       userLogin: userData.login,
       userPassword: userData.password,
     };
     integrationSvc.invokeOperation('registerUser', null, renamedData, function(response) {
       if (response.userRegistrationError) {
         errorCb(response.userRegistrationError);
       } else {
          successCb(response.userNewId);
       }
     }, function(error) {
       errorCb(error);
     });
   }
  
    return {
      findUser: findUser,
      registerUser: registerUser,
    };
});