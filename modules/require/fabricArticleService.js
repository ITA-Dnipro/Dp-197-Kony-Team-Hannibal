define(function () {
  var client = kony.sdk.getCurrentInstance();
  var sqlSvc = client.getIntegrationService('MySQLService');
  
  function getUserArticles(userId, successCb, errorCb) {
    sqlSvc.invokeOperation('getUserArticles', null , { userId: userId }, function(resp) {
      successCb(resp.records);
    }, errorCb);
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
    
    sqlSvc.invokeOperation('createArticle', headers, body, function(response) {      
      if(response.articleCreateResult === "success_add") {
        article.id = response.createdArticleId;
        successCb(article);
      } else {
        errorCb(response.articleCreateResult);
      }
    }, function(error){
      errorCb(error);
    });  
  }  
    return {
       getUserArticles: getUserArticles,
       addArticle: addArticle
    };
});