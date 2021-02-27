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
      successCb();
    } catch(e) {
      errorCb(e.message);
    }
  }
  
  function addStartResources(userId, successCb, errorCb) {
    
    var startResources = [
      { name: 'BBC', url: 'https://www.bbc.com', logo: 'bbc.jpg' },
      { name: 'Wall Street Journal', url: 'https://www.wsj.com', logo: 'wall_street_journal_.jpg' },
      { name: 'Reuters', url: 'https://www.reuters.com', logo: 'reuters.png' },
      { name: 'Al Jazeera', url: 'https://www.aljazeera.com', logo: 'al_jazeera.jpg' },
      { name: 'Mirror', url: 'https://www.mirror.co.uk', logo: 'mirror.png' },
      { name: 'CBS News', url: 'https://www.cbsnews.com', logo: 'cbs.jpg' },
      { name: 'CNBC', url: 'https://www.cnbc.com', logo: 'cnbc.jpg' },
    ];
    addResources(userId, startResources, successCb, errorCb);
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
      addStartResources: addStartResources,
      getResources: getResources,
      deleteResource: deleteResource,
    };
});