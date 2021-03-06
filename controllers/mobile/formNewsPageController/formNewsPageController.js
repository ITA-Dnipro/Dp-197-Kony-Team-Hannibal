define(['utils', 'articleService'], function(utils, service){ 
   function successCb(article) {
    appStorage.articles.push(article);
    alert('Article successfully added');
  }
  
   function errorCb(err) {
    if(err === "user_not_exist") {
      alert("This user doesn't exist");
    } else {
      alert("This article already added");
    }   
  }
  
//   function onBtnAddClicked(thisButton, list) {
//     var selectedRowItem = list.widgetInfo.selectedRowItems[0];
//     var articleToAdd = new NewsModel(selectedRowItem.newsTitle, selectedRowItem.logo, selectedRowItem.link, selectedRowItem.pubDate);
//     service.addArticle(articleToAdd, successCb, errorCb);
//   }
  
    return {
      onInit: function() {
        this.view.postShow = this.onFormShowed.bind(this);
      },
     
      onFormShowed: function() {
        var urlConf = { URL: appStorage.newsToShow.link };
        this.view.HeaderControl.onBackClicked = function() {
          return true;
        };
        this.view.browserWidget.requestURLConfig = urlConf;
        this.view.btnAddFavourites.onClick = this.onBtnAddClicked.bind();
      },
      
      onBtnAddClicked: function () {
        var articleToAdd = appStorage.newsToShow;
        service.addArticle(articleToAdd, successCb, errorCb);
      },
  
//       onBack: function() {
//         utils.navigateToForm('formNewsList');
//       },
      
      moveToProfile: function() {
        var formId = kony.application.getCurrentForm().id;
        utils.navigateToForm('formUserProfile', formId);
      },
    };
 });