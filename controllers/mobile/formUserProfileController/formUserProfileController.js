define(["userProfileService", 'utils'], function(service, utils) {
  
	return {
      onInit: function() {
        this.view.postShow = this.onFormShow.bind(this);
        this.view.btnBackToPreviousUserProfile.onClick = this.onBackBtn.bind(this);
        this.view.editBtn.onClick = this.onEditBtnClick.bind(this);
        this.view.logOutBtn.onClick = this.onBtnLogOutClick.bind(this);
      },
      
      onFormShow: function() {
        this.showUser(); 
      },
    
      showUser: function() {
        this.userData = appStorage.userProfile;
        this.view.loginField.text = "Login: " + this.userData.login;
        this.view.emailField.text = "E-mail: " + this.userData.email;
        this.view.nameField.text = "Full name: " + this.userData.fullName;
      },
      
      onNavigate: function(form) {
        if (form) {
          this.formForBackBtn = form;
        }
      },
      
      onBackBtn: function() {
        utils.navigateToForm(this.formForBackBtn);
      },
      
      onEditBtnClick: function() {
        utils.navigateToForm("formUserProfileEdit");
      },
      
      logOut: function() {
        appStorage.userProfile = {};
        utils.navigateToForm("formAuthentication");  
      },
      
      onBtnLogOutClick: function() {
        utils.confirmAlert("Are you sure to log out?", this.logOut);
      },
      
      
    };
 });