define(['fabricArticleService'], function (fabricImpl) {
   var concreteImpl = fabricImpl;
    return {
      getUserArticles: concreteImpl.getUserArticles,
      addArticle: concreteImpl.addArticle,
      deleteArticle: concreteImpl.deleteArticle,
    };
});