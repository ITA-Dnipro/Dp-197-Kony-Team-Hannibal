define(function () {
  var client = kony.sdk.getCurrentInstance();
  var sqlSvc = client.getIntegrationService('MySQLService');
  
  function getUserArticles(userId, successCb, errorCb) {
    sqlSvc.invokeOperation('getUserArticles', null , { userId: userId }, function(resp) {
      successCb(resp.records);
    }, errorCb);
  }
  
    return {
       getUserArticles: getUserArticles,
    };
});