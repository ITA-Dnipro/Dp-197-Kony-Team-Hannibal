define(['fabricArticleService'], function (fabricImpl) {
   var concreteImpl = fabricImpl;
    return {
      getUserArticles: concreteImpl.getUserArticles,
    };
});