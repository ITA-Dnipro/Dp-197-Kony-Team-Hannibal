define({ 

 onInit: function() {
   this.view.ButtonTest.onClick = this.onBtnTest.bind(this);
 },
  
  onBtnTest: function() {
    var formId = kony.application.getCurrentForm().id;
    var navigation = new kony.mvc.Navigation("formUserProfile");
    navigation.navigate(formId);
  },
  
 });