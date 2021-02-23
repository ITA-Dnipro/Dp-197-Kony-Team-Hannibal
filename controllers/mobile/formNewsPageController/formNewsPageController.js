define(['utils'], function(utils){ 
    return {
      onInit: function() {
        this.view.postShow = this.onFormShowed.bind(this);
        this.view.btnBack.onClick = this.onBack.bind(this);
        this.view.userName.onTouchStart = this.moveToProfile.bind(this);
      },
     
      onFormShowed: function() {
        var urlConf = { URL: appStorage.linkOnShowBrowser };
        this.view.userName.text = appStorage.userProfile.login;
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