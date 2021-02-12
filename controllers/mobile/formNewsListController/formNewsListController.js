define(['utils'], function(utils) {
  return { 
    moveToProfile: function() {
      var formId = kony.application.getCurrentForm().id;
      utils.navigateToForm('formUserProfile', formId);
    },
  
    onBack: function () {
      utils.navigateToForm('formNewsFeeds');
    },
  
    onFormShowed: function() {
      this.view.newsList.setData(appStorage.news);
      this.view.userName.text = appStorage.userProfile.login;
    },
  
    init: function() {
      this.view.postShow = this.onFormShowed.bind(this);
      this.view.btnBack.onClick = this.onBack.bind(this);
      this.view.userName.onTouchStart = this.moveToProfile.bind(this);
    }
 };
});