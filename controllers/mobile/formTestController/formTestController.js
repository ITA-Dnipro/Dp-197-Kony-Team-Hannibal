define({ 

 onInit: function() {
   this.view.ButtonTest.onClick = this.onBtnTest.bind(this);
   this.view.postShow = this.onShow.bind(this);
   alert("Im init");
 },
  
  onBtnTest: function() {
    var navigation = new kony.mvc.Navigation("formUserProfile");
    navigation.navigate();
  },
  
  onShow: function() {
    alert("Im post");
  }

 });