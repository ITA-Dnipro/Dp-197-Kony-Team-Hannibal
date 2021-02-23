define(['utils'], function(utils) {
  function onBtnAddClicked(thisButton, list) {
    var selectedRowItem = list.widgetInfo.selectedRowItems[0];
    var newsToAdd = new NewsModel(selectedRowItem.newsTitle, selectedRowItem.logo, selectedRowItem.link, selectedRowItem.pubDate);
    alert(newsToAdd);
  }
  
  return { 
    moveToProfile: function() {
      var formId = kony.application.getCurrentForm().id;
      utils.navigateToForm('formUserProfile', formId);
    },
  
    onBack: function () {
      utils.navigateToForm('formNewsFeeds');
    },
  
    onFormShowed: function() {
      var dataNews = appStorage.news.map(function(item) {
        item.btnAddNews = {
          "text": "Add",
          "onClick": onBtnAddClicked.bind(this)
        };
        return item;
      });
      this.view.newsList.setData(dataNews);
      this.view.userName.text = appStorage.userProfile.login;
    },
  
    init: function() {
      this.view.postShow = this.onFormShowed.bind(this);
      this.view.btnBack.onClick = this.onBack.bind(this);
      this.view.userName.onTouchStart = this.moveToProfile.bind(this);
    }
 };
});