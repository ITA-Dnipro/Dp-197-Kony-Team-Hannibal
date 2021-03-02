define({ 

  onInit: function() {
          this.view.HeaderControl.onBackClicked = this.onBackBtn.bind(this); 
        },
  
  onBackBtn: function() {
        utils.navigateToForm('formUserProfile');
      },

 });