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
  
   function getResources(url, successCb, errorCb) {
     var resourcesUrl = appConstants.FEEDS_API + url;
     function extractResources(data) {
       var resources = data.reduce(function(acc, feed) {
         var isResourceRepeated = acc.some(function(addedResource) {
           return addedResource.site_name === feed.site_name && addedResource.site_url === feed.site_url;
         });
         return isResourceRepeated ? acc : acc.concat({ site_name: feed.site_name, site_url: feed.site_url });
       }, []);
       successCb(resources);
     }
     utils.httpRequest(constants.HTTP_METHOD_GET, resourcesUrl, extractResources, errorCb);
   }
  
    return {
      getResourceTopics: getResourceTopics,
      getResources: getResources,
    };
});