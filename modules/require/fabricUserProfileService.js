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
     });      
    }
  }
  
  function addArticle(article, successCb, errorCb) {
    var headers = null;
    var body = {
      newTitle: article.newsTitle,
      newLogo: article.logo,
      newLink: article.link,
      newDate: article.pubDate,
      userId: appStorage.userId,
    };
    alert(JSON.stringify(body) + "\n" + "newTitlle:" + body.newTitle.length);
    integrationSvc.invokeOperation('createArticle', headers, body, function(response) {
      
      if(response.articleCreateResult === "Article successfully added") {
        successCb(article);
      } else {
        errorCb(JSON.stringify(response) + "==================================================" + "link length:"+ body.newLink.length + "=====" + "logo length:" + body.newLogo.length + "=====" + "title length:" + body.newTitle.length);
      }
    });
    
  }
  
    return {
        editUser: editUser,
        addArticle: addArticle,
    };
});