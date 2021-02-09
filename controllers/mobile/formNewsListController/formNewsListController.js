define({ 
   onNavigate: function(data) {
      this.data = data.data;
    }, 

   onBtnTest: function() {
      var formId = kony.application.getCurrentForm().id;
      var navigation = new kony.mvc.Navigation("formUserProfile");
      navigation.navigate(formId);
    },
  
   onBack: function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    },
  
    onFormShowed: function() {
      var data = this.data;
      this.view.newsList.setData(data);
    },
  
    init: function() {
      this.view.postShow = this.onFormShowed.bind(this);
      this.view.btnBack.onClick = this.onBack.bind(this);
      this.view.userName.onTouchStart = this.onBtnTest.bind(this);
    }
  
 });