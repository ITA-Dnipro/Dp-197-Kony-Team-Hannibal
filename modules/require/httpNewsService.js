define(['utils'], function (utils) {
   function getFeedData(url, successCb, errorCb) {
     function retrieveFeedData(data) {
       var feedData = data.rss.channel.item.map(function(item) {
         return new NewsModel(item.title, item.link, item.pubDate);
       });
       successCb(feedData);
     }
     utils.httpRequest(constants.HTTP_METHOD_GET, url, retrieveFeedData, errorCb);
   }
  
    return {
       getFeedData: getFeedData,
    };
});