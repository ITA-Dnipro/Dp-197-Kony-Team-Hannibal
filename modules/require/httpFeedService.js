define(['utils'], function (utils) {
   function getFeedData(url, successCb, errorCb) {
     function retrieveFeedData(data) {
       var feedData = data.rss.channel.item.map(function(item) {
         return {
           newsTitle: item.title,
           newsDescription: item.description,
         };
       });
      
       successCb(feedData);
     }
     utils.httpRequest(constants.HTTP_METHOD_GET, url, retrieveFeedData, errorCb);
   }
  
    return {
       getFeedData: getFeedData,
    };
});