define(["utils"], function (utils) {
   function getResourceTopics(url, successCb, errorCb) {
     function retrieveTopicData(data) {
       var topics = data.map(function(feedData) {
         return { description: feedData.title, url: feedData.url };
       });
       successCb(topics);
     }
     
     utils.httpRequest(constants.HTTP_METHOD_GET, url, retrieveTopicData, errorCb);
   }
  
    return {
        getResourceTopics: getResourceTopics,
    };
});