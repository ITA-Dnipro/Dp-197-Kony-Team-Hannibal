define(['utils'], function (utils) {
   function getFeedData(url, successCb, errorCb, logo) {
     function retrieveFeedData(data) {
       var feedData = data.rss.channel.item.map(function(item) {
         var date = new Date(item.pubDate).toLocaleString();
         return new NewsModel(item.title, logo, item.link, date);
       });
       successCb(feedData);
     }
     utils.httpRequest(constants.HTTP_METHOD_GET, url, retrieveFeedData, errorCb);
   }
  
    return {
       getFeedData: getFeedData,
    };
});