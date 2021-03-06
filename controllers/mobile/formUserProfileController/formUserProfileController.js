define(['utils'], function(utils) {
  
	return {
      onInit: function() {
        this.view.postShow = this.onFormShow.bind(this);
        this.view.HeaderControl.onBackClicked = this.onBackBtn.bind(this);
        this.view.editBtn.onClick = this.onEditBtnClick.bind(this);
        this.view.logOutBtn.onClick = this.onBtnLogOutClick.bind(this);
        this.view.btnChangePassword.onClick = this.onChangePassword.bind(this);
        this.view.BtnShowfavorites.onClick = this.onArticlesBtnClick.bind(this);
      },
      
      onFormShow: function() {
        this.showUser(); 
      },
    
      showUser: function() {
        this.userData = appStorage.userProfile;
        this.view.loginField.text = "Login: " + this.userData.login;
        this.view.emailField.text = "E-mail: " + this.userData.mail;
        this.view.nameField.text = "Full name: " + this.userData.fullName;
      },
      
      onNavigate: function(form) {
        if (form) {
          this.formForBackBtn = form;
        }
      },
      
      onBackBtn: function() {
        utils.navigateToForm(this.formForBackBtn);
      },
      
      onEditBtnClick: function() {
        utils.navigateToForm("formUserProfileEdit");
      },
      
      onArticlesBtnClick: function() {
        utils.navigateToForm("formArticles");
      },
      
      onChangePassword: function() {
        utils.navigateToForm("formChangePassword");
      },
      
      logOut: function() {
        appStorage = {
          newsToShow: {},
          userId: null,
          userProfile: {
            login: '',
            fullName: '',
            mail: ''
          },
          articles: [],
          userResources: [],
          feeds: [],
          news: [],
        };
        utils.navigateToForm("formAuthentication");  
      },
      
      onBtnLogOutClick: function() {
        utils.confirmAlert("Are you sure that you want to log out ?", this.logOut);
      },
      
      
    };
 });