define(["userProfileService", 'utils'], function(service, utils) {
  
	return {
      onInit: function() {
        this.view.postShow = this.onFormShow.bind(this);
        this.view.HeaderControl.onBackClicked = this.onBackBtn.bind(this);
        this.view.saveEditBtn.onClick = this.onSaveEditBtnClick.bind(this);
        this.succesCB = this.succesCB.bind(this);
        this.errorCB = this.errorCB.bind(this);
      },
    
      onFormShow: function() {
        this.showUser();
      },
      
      showUser: function() {
        this.userData = appStorage.userProfile;
		this.view.textFieldForNameEdit.text = this.userData.fullName;
        this.view.textFieldForMailEdit.text = this.userData.email;
        this.view.textFieldForLoginEdit.text = this.userData.login;
      },
      
      onBackBtn: function() {
        utils.navigateToForm('formUserProfile');
      },
      
      onSaveEditBtnClick: function() {
        var newUserData = {
          id: this.userData.id,
          fullName: this.view.textFieldForNameEdit.text.trim(),
          email: this.view.textFieldForMailEdit.text.trim(),
          login: this.view.textFieldForLoginEdit.text.trim(),
        };
        service.editUser(newUserData, this.succesCB, this.errorCB);
      },
      
      succesCB: function(newUser) {
        appStorage.userProfile = newUser;
        alert("Your changes have saved successfully");
        utils.navigateToForm('formUserProfile');
      },
      
      errorCB: function(err) {
        alert(err);
      }
      
    };
 });