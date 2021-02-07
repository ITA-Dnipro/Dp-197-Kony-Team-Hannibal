define(["AuthService"], function(service) {
  
	return {
      onInit: function() {
        this.view.postShow = this.showUser.bind(this);
        this.view.btnBackToPreviousEditUser.onClick = this.onBackBtn.bind(this);
      },
    
      showUser: function() {
      },
      
      onBackBtn: function() {
        var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
        navigation.navigate();
      },
      
    };
 });