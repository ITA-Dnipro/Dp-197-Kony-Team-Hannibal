define(['newsService', 'constants', 'utils'], function(newsService, constants, utils) { 
  function showNews(news) {
    appStorage.news = news;
    utils.navigateToForm('formNewsList');
  }
  
  function renderErr(err) {
    alert(err);
  }
  
  return { 
    moveToProfile: function() {
      var formId = kony.application.getCurrentForm().id;
      utils.navigateToForm('formUserProfile', formId);
    },
    
    onBack: function () {
      utils.navigateToForm('formNewsProviders');
    },
  
    onFormShowed: function() {
      this.view.newsFeeds.setData(appStorage.feeds);
      this.view.HeaderControl.onBackClicked = this.onBack.bind(this);
    },
    
    onRowCick: function(widget, section, index) {
      var topicUrl = widget.data[index].url;
      var feedUrl = constants.XML_CONVERTER_API + topicUrl;
      var logo = appStorage.feeds[0].logo;
      newsService.getFeedData(feedUrl, showNews, renderErr, logo);
    },
  
    init: function() {
      this.view.postShow = this.onFormShowed.bind(this);
      this.view.newsFeeds.onRowClick = this.onRowCick.bind(this);
    }
  };
 });