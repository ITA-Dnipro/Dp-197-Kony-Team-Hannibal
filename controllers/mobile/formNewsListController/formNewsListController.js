define(['utils', "articleService"], function(utils, service) {
  
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

  function onBtnAddClicked(thisButton, list) {
    var selectedRowItem = list.widgetInfo.selectedRowItems[0];
    var articleToAdd = new NewsModel(selectedRowItem.newsTitle, selectedRowItem.logo, selectedRowItem.link, selectedRowItem.pubDate);
    service.addArticle(articleToAdd, successCb, errorCb);
  }
  
  function onRowClicked(widget, sectionIdx, rowIdx) {
    var newsToShow = new NewsModel(widget.data[rowIdx].newsTitle, widget.data[rowIdx].logo, widget.data[rowIdx].link, widget.data[rowIdx].pubDate);
    appStorage.newsToShow = newsToShow;
    utils.navigateToForm('formNewsPage');
    
  }
  
  
  return { 
    moveToProfile: function() {
      var formId = kony.application.getCurrentForm().id;
      utils.navigateToForm('formUserProfile', formId);
    },
  
    onBack: function () {
      utils.navigateToForm('formNewsFeeds');
    },
  
    onFormShowed: function() {
      var dataNews = appStorage.news.map(function(item) {
        item.btnAddNews = {
          "onClick": onBtnAddClicked.bind(this)
        };
        return item;
      });
      this.view.newsList.setData(dataNews);
      this.view.HeaderControl.onBackClicked = this.onBack.bind(this);
    },
    

    init: function() {
      this.view.postShow = this.onFormShowed.bind(this);
      this.view.newsList.onRowClick = onRowClicked.bind(this);
    }
 };
});