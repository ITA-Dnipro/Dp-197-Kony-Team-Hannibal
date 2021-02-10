define(['feedService', 'constants'], function(service, constants) { 
 function navigateToNewsList(data) {
    var navigator = new kony.mvc.Navigation('formNewsList');
    navigator.navigate({ data: data });
  }
  
  function renderErr(err) {
    alert(err);
  }
  
  return {
    onNavigate: function(data) {
      this.feeds = data.feeds;
    },
    
    onBtnTest: function() {
      var formId = kony.application.getCurrentForm().id;
      var navigation = new kony.mvc.Navigation("formUserProfile");
      navigation.navigate(formId);
    },
    
    onBack: function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    },
  
    onFormShowed: function() {
      var feeds = this.feeds;
      this.view.newsFeeds.setData(feeds);
    },
    
    onRowCick: function(widget, section, index) {
      var topicUrl = widget.data[index].url;
      var feedUrl = constants.XML_CONVERTER_API + topicUrl;
      service.getFeedData(feedUrl, navigateToNewsList, renderErr);
    },
  
    init: function() {
      this.view.userName.onTouchStart = this.onBtnTest.bind(this);
      this.view.postShow = this.onFormShowed.bind(this);
      this.view.newsFeeds.onRowClick = this.onRowCick.bind(this);
      this.view.btnBack.onClick = this.onBack.bind(this);
    }
  };
 });