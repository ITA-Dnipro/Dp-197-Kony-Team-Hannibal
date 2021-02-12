define(['constants', 'topicsService', 'utils'], function(constants, service, utils) { 
  
  function showFeeds(feeds) {
    appStorage.feeds = feeds;
    utils.navigateToForm('formNewsFeeds');
  }
  
  function renderErr(err) {
    alert(err);
  }
  
  return {
    onInit: function() {
      this.view.postShow = this.onPostShow.bind(this);
      this.view.newsChannels.onRowClick = this.onRowClick.bind(this);
      this.view.userName.onTouchStart = this.moveToProfile.bind(this);
    },
    
    onPostShow: function() {
      this.view.userName.text = appStorage.userProfile.login;
    },
    
    moveToProfile: function() {
      var formId = kony.application.getCurrentForm().id;
      utils.navigateToForm('formUserProfile', formId);
    },
  
    onRowClick: function(widget, section, index) {
      var resourceUrl = widget.data[index].url;
      var topicsApiUrl = constants.FEEDS_API + resourceUrl;
      service.getResourceTopics(topicsApiUrl, showFeeds, renderErr);
    }
  };
 });