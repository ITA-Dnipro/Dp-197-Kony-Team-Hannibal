define(["AuthService"], function(service) {
  
	return {
      onInit: function() {
        this.view.postShow = this.onFormShow.bind(this);
        this.view.btnBackToPreviousEditUser.onClick = this.onBackBtn.bind(this);
      },
    
      onFormShow: function() {
        this.showUser();
      },
      
      showUser: function() {
        this.userData = UserProfile;
		this.view.textFieldForNameEdit.text = this.userData.fullName;
        this.view.textFieldForMailEdit.text = this.userData.email;
        this.view.textFieldForLoginEdit.text = this.userData.login;
        this.view.textFieldForPasswordEdit.text = this.userData.password;
        this.view.textFieldForConfirmPswEdit.text = this.userData.password;
      },
      
      onBackBtn: function() {
        var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
        navigation.navigate();
      },
      
    };
 });