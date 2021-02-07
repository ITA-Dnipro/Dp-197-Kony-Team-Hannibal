define(["AuthService"], function(service) {
  
	return {
      onInit: function() {
        this.view.postShow = this.showUser.bind(this);
        this.view.btnBackToPreviousUserProfile.onClick = this.onBackBtn.bind(this);
        this.view.editBtn.onClick = this.onEditBtnClick.bind(this);
      },
    
      showUser: function() {
        this.userData = UserProfile;
        this.view.loginField.text = "Login: " + this.userData.login;
        this.view.emailField.text = "E-mail: " + this.userData.email;
        this.view.nameField.text = "Full name: " + this.userData.fullName;
      },
      
      onNavigate: function(form) {
        if(form) {
          this.formForBackBtn = form;
        }
      },
      
      onBackBtn: function() {
        var navigation = new kony.mvc.Navigation(this.formForBackBtn);
        navigation.navigate();
      },
      
      onEditBtnClick: function() {
        var navigation = new kony.mvc.Navigation("formUserProfileEdit");
        navigation.navigate();
      }
      
    };
 });