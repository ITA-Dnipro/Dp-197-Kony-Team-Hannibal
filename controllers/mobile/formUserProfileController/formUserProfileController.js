define(["AuthService"], function(service) {
  
	return {
      onInit: function() {
        this.userData = UserProfile;
        this.view.postShow = this.showUser.bind(this); 
      },
    
      
      showUser: function() {
       this.view.nameField.text = "Full name: " + this.userData.fullName;
       this.view.emailField.text = "E-mail: " + this.userData.email;
       this.view.loginField.text = "Login: " + this.userData.login;
      },
    };
 });