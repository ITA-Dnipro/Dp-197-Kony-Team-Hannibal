define(['constants'], function (appConstants) {
  function findResources(url, successCb, errorCb) {
    function extractResources(data) {
       var resources = data.responseList.reduce(function(acc, feed) {
           var isResourceRepeated = acc.some(function(addedResource) {
             return addedResource.name === feed.site_name && addedResource.url === feed.site_url;
           });
         return isResourceRepeated ? acc : acc.concat(new NewsResourceModel(feed.site_name, feed.site_url, feed.favicon));
       }, []);
       successCb(resources);
     }
    var client = kony.sdk.getCurrentInstance();
    var integrationSvc = client.getIntegrationService('RSSFeedService');
    integrationSvc.invokeOperation('getRSSResources', null, { resDomain: url }, extractResources, errorCb);
  } 
  
  
  return {
    findResources: findResources,
  };
});