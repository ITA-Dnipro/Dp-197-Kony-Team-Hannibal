define(['constants', 'topicsService'], function(constants, service) { 
  
  function navigateToFeeds(feeds) {
    var navigator = new kony.mvc.Navigation('formNewsFeeds');
    navigator.navigate({ feeds: feeds });
  }
  
  function renderErr(err) {
    alert(err);
  }
  
  return {
    onInit: function() {
      this.view.postShow = this.onPostShow.bind(this);
      this.view.newsChannels.onRowClick = this.onRowClick.bind(this);
      this.view.userName.onTouchStart = this.onBtnTest.bind(this);
    },
    
    onPostShow: function() {
      this.view.userName.text = UserProfile.login;
    },
    
    onBtnTest: function() {
      var formId = kony.application.getCurrentForm().id;
      var navigation = new kony.mvc.Navigation("formUserProfile");
      navigation.navigate(formId);
    },
  
    onRowClick: function(widget, section, index) {
      var resourceUrl = widget.data[index].url;
      var topicsApiUrl = constants.FEEDS_API + resourceUrl;
      service.getResourceTopics(topicsApiUrl, navigateToFeeds.bind(this), renderErr);
    }
  };
 });