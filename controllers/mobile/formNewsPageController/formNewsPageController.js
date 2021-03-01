define(['utils'], function(utils){ 
    return {
      onInit: function() {
        this.view.postShow = this.onFormShowed.bind(this);
      },
     
      onFormShowed: function() {
        var urlConf = { URL: appStorage.newsToShow.link };
        this.view.HeaderControl.onBackClicked = this.onBack.bind(this);
        this.view.browserWidget.requestURLConfig = urlConf;
      },
  
      onBack: function() {
        utils.navigateToForm('formNewsList');
      },
      
      moveToProfile: function() {
        var formId = kony.application.getCurrentForm().id;
        utils.navigateToForm('formUserProfile', formId);
      },
    };
 });