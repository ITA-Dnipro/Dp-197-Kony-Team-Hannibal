define(["utils", 'constants'], function (utils, appConstants) {
   function getResourceTopics(url, successCb, errorCb) {
     function retrieveTopicData(data) {
       var topics = data.map(function(feedData) {
         return new RssFeedModel(feedData.title, feedData.url, feedData.favicon);
       })
       .filter(function(feed) {
         return /^https:\/\//.test(feed.url);
       });
       successCb(topics);
     }
     utils.httpRequest(constants.HTTP_METHOD_GET, url, retrieveTopicData, errorCb);
   }
  
    return {
      getResourceTopics: getResourceTopics,
    };
});