define(["utils", "userProfileService"], function(utils, service) { 
  function successCb() {
    utils.navigateToForm('formUserProfile');
    alert("Your password has successfully changed");
  }
  
  function errorCb() {
    alert("You inserted wrong old password");
  }
  
  function clearFields() {
    this.view.oldPassword.text = "";
    this.view.newPassword.text = "";
    this.view.confirmNewPassword.text = "";
  }
  return {
    onInit: function() {
        this.view.HeaderControl.onBackClicked = this.onBackBtn.bind(this);
        this.view.changeBtn.onClick = this.onChangeBtn.bind(this);
        this.clearFields = clearFields.bind(this);
    },

    onBackBtn: function() {
        utils.navigateToForm('formUserProfile');
    },
    

    onChangeBtn: function() {
      var passwords = {
        oldPsw: this.view.oldPassword.text.trim(),
        newPsw: this.view.newPassword.text.trim(),
        confirmPsw: this.view.confirmNewPassword.text.trim(),
        userId: appStorage.userId,   
      };
        utils.confirmAlert("Are you sure that you want to change password ?", function(){
          service.changePassword(passwords, successCb, errorCb);
        });
      this.clearFields();
    }   
  };
 });

