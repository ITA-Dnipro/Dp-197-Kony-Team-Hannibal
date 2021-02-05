define(["AuthService"], function(service) {
  
	return {
      onInit: function() {
        this.userData = UserProfile;
        this.view.postShow = this.showUser.bind(this); 
      },
    
      
      showUser: function() {
       this.view.nameLbl.text = "Full name: " + this.userData.fullName;
       this.view.mailLbl.text = "E-mail: " + this.userData.email;
       this.view.loginLbl.text = "Login: " + this.userData.login;
      },
    };
 });