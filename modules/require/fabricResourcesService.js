define(['constants'], function (appConstants) {
  var client = kony.sdk.getCurrentInstance();
  var sqlSvc = client.getIntegrationService('MySQLService');
  
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
   
    var integrationSvc = client.getIntegrationService('RSSFeedService');
    integrationSvc.invokeOperation('getRSSResources', null, { resDomain: url }, extractResources, errorCb);
  } 
  
  function getUserResources(userId, successCb, errorCb) {
    sqlSvc.invokeOperation('getUserResources', null, { userId: userId }, function(resp) {
      var renamedRecords = resp.records.map(function(rec) {
        return {
          resourceId: rec.resource_id,
          logo: rec.logo,
          url: rec.url,
          name: rec.title,
        };
      });
      successCb(renamedRecords);
    }, errorCb);
  }
  
  function addResources() {
    
  }
  
  function addStartResources(userId, successCb, errorCb) {
    sqlSvc.invokeOperation('addStartResources', null, { user_id: userId }, successCb, errorCb);
  }
  
  function deleteResource() {
    
  }
  
  return {
    findResources: findResources,
    addResources: addResources,
    addStartResources: addStartResources,
    getUserResources: getUserResources,
    deleteResource: deleteResource,
  };
});