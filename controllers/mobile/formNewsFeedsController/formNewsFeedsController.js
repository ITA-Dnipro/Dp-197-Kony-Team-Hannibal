define(['newsService', 'constants', 'utils'], function(service, constants, utils) { 
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
      this.view.userName.text = appStorage.userProfile.login;
    },
    
    onRowCick: function(widget, section, index) {
      var topicUrl = widget.data[index].url;
      var feedUrl = constants.XML_CONVERTER_API + topicUrl;
      service.getFeedData(feedUrl, showNews, renderErr);
    },
  
    init: function() {
      this.view.userName.onTouchStart = this.moveToProfile.bind(this);
      this.view.postShow = this.onFormShowed.bind(this);
      this.view.newsFeeds.onRowClick = this.onRowCick.bind(this);
      this.view.btnBack.onClick = this.onBack.bind(this);
    }
  };
 });