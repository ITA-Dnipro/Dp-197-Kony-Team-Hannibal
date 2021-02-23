define(['utils'], function (utils) {
   function getFeedData(url, successCb, errorCb, logo) {
     function retrieveFeedData(data) {
       var feedData = data.rss.channel.item.map(function(item) {
         return new NewsModel(item.title, logo, item.link, item.pubDate);
       });
       successCb(feedData);
     }
     utils.httpRequest(constants.HTTP_METHOD_GET, url, retrieveFeedData, errorCb);
   }
  
    return {
       getFeedData: getFeedData,
    };
});