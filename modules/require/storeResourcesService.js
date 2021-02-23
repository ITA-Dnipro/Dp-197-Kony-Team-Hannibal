define(['utils', 'constants'], function (utils, appConstants) {
   
  function findResources(url, successCb, errorCb) {
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
  
  function addResources(userId, newResources, successCb, errorCb) {
    try {
      var userData = kony.store.getItem(userId) || {};
      var userResources = userData.resources || [];
      userResources = userResources.concat(newResources);
      userData.resources = userResources;
      kony.store.setItem(userId, userData);
      successCb(userResources);
    } catch(e) {
      errorCb(e.message);
    }
  }
  
  function getResources(userId, successCb, errorCb) {
    try {
      var userData = kony.store.getItem(userId) || {};
      var userResources = userData.resources || [];
      successCb(userResources);
    } catch (e) {
      errorCb(e.message);
    }
  }
  
  function deleteResource(userId, deleteUrl, successCb, errorCb) {
    try {
      var userData = kony.store.getItem(userId) || {};
      var oldResources = userData.resources || [];
      var newResources = oldResources.filter(function(res) {
        return res.url !== deleteUrl;
      });
      userData.resources = newResources;
      kony.store.setItem(userId, userData);
      successCb(newResources);
    } catch (e) {
      errorCb(e.message);
    }
  }
  
    return {
      findResources: findResources,
      addResources: addResources,
      getResources: getResources,
      deleteResource: deleteResource,
    };
});