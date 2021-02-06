define(["AuthService"], function(service) {
  
	return {
      onInit: function() {
        this.view.postShow = this.showUser.bind(this);
        this.view.btnBackToPrevious.onClick = this.onBackBtn.bind(this);
      },
    
      
      showUser: function() {
        this.userData = UserProfile;
        this.view.loginField.text = "Login: " + this.userData.login;
        this.view.emailField.text = "E-mail: " + this.userData.email;
        this.view.nameField.text = "Full name: " + this.userData.fullName;
      },
      
      onBackBtn: function() {
        var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
        navigation.navigate();
      }
    };
 });