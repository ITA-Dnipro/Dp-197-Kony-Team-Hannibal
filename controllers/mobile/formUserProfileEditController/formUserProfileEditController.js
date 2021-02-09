define(["editUsersService"], function(service) {
  
	return {
      onInit: function() {
        this.view.postShow = this.onFormShow.bind(this);
        this.view.btnBackToPreviousEditUser.onClick = this.onBackBtn.bind(this);
        this.view.saveEditBtn.onClick = this.onSaveEditBtnClick.bind(this);
        this.succesCB = this.succesCB.bind(this);
        this.errorCB = this.errorCB.bind(this);
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
      
      onSaveEditBtnClick: function() {
        var newUserData = {
          id: this.userData.id,
          fullName: this.view.textFieldForNameEdit.text.trim(),
          email: this.view.textFieldForMailEdit.text.trim(),
          login: this.view.textFieldForLoginEdit.text.trim(),
          password: this.view.textFieldForPasswordEdit.text.trim(),
          passwordConfirm: this.view.textFieldForConfirmPswEdit.text.trim(),
        };
        service.editUser(newUserData, this.succesCB, this.errorCB);
        
      },
      
      succesCB: function(newUser) {
        UserProfile = newUser;
        alert("Your changes have saved successfully");
        var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
        navigation.navigate();
      },
      
      errorCB: function(err) {
        alert(err);
      }
      
    };
 });