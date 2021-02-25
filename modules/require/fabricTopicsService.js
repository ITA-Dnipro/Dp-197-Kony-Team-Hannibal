define(function () {
  var getResourceTopics = function(url, successCallback, errorCallback) {
    
    var sdk = kony.sdk.getCurrentInstance();
    var rssFeedService = sdk.getIntegrationService('RSSFeedService');
    var headers = null;
    var body = { resDomain: url };
    
    rssFeedService.invokeOperation('getRSSFeeds', headers, body, function(response) {
      if (response.responseList && (response.httpStatusCode === 200)) {
        var dataFeeds = response.responseList.map(function (feeds) {
          return new RssFeedModel(feeds.title, feeds.url, feeds.favicon);
        });
        successCallback(dataFeeds);
      } else {
        errorCallback(response);
      }
    });
  }; 
    return {
      getResourceTopics: getResourceTopics,
    };
});