define(['utils'], function (utils) {
   function getFeedData(url, successCb, errorCb, logo) {
     function retrieveFeedData(data) {
       var feedData = data.rss.channel.item.map(function(item) {
         var date = new Date(item.pubDate);
         var month = (date.getMonth() + 1)  + "";
         if (month.length < 2) {
           month = 0 + month;
         }
         var day = date.getDate() + "";
         if (day.length < 2) {
           day = 0 + day;
         }
         var hours = date.getHours() + "";
         if (hours.length < 2) {
           hours = 0 + hours;
         }
         var minutes = date.getMinutes() + "";
         if (minutes.length < 2) {
           minutes = 0 + minutes;
         }
         var seconds = date.getSeconds() + "";
         if (seconds.length < 2) {
           seconds = 0 + seconds;
         }
         var convertedDate = date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
         return new NewsModel(item.title, logo, item.link, convertedDate);
       });
       successCb(feedData);
     }
     utils.httpRequest(constants.HTTP_METHOD_GET, url, retrieveFeedData, errorCb);
   }
  
    return {
       getFeedData: getFeedData,
    };
});