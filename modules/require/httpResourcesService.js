define(['utils', 'constants'], function (utils, appConstants) {
   
  function getResources(url, successCb, errorCb) {
     var resourcesUrl = appConstants.FEEDS_API + url;
     function extractResources(data) {
       var resources = data.filter(function(res) {
         return res.content_type === appConstants.RSS_CONTENT_TYPE;
         })
         .reduce(function(acc, feed) {
           var isResourceRepeated = acc.some(function(addedResource) {
             return addedResource.name === feed.site_name && addedResource.url === feed.site_url;
           });
         return isResourceRepeated ? acc : acc.concat(new NewsResourceModel(feed.site_name, feed.site_url, feed.favicon));
       }, []);
       successCb(resources);
     }
     utils.httpRequest(constants.HTTP_METHOD_GET, resourcesUrl, extractResources, errorCb);
   }
  
    return {
       getResources: getResources,
    };
});