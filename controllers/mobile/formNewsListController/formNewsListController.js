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
    
    renderDefList: function() {
      this.view.lblNotFound.isVisible = false;
      this.view.newsList.isVisible = true;
      var dataNews = appStorage.news.map(function(item) {
        item.btnAddNews = {
          "onClick": onBtnAddClicked.bind(this)
        };
        return item;
      });
      this.view.newsList.setData(dataNews);
           
    },
  
    onFormShowed: function() {
      this.view.newsSearch.text = "";
      this.renderDefList();
      this.view.HeaderControl.onBackClicked = this.onBack.bind(this); 
    },
    
    onCancelClick: function() {
      this.view.newsSearch.text = "";
      this.renderDefList();
    },
    
    onSearchBtnClick: function() {
      var searchValue = this.view.newsSearch.text;
      var searchingNews = appStorage.news.filter(function(item) {
        return item.newsTitle.includes(searchValue);
      });
      if (searchingNews.length < 1) {
        this.view.lblNotFound.isVisible = true;
        this.view.newsList.isVisible = false;
      } else {
        this.view.lblNotFound.isVisible = false;
        this.view.newsList.isVisible = true;
        var dataNews = searchingNews.map(function(item) {
        item.btnAddNews = {
          "onClick": onBtnAddClicked.bind(this)
        };
        return item;
      });
        this.view.newsList.setData(dataNews);
      }
    },
    

    init: function() {
      this.view.postShow = this.onFormShowed.bind(this);
      this.view.newsList.onRowClick = onRowClicked.bind(this);
      this.renderDefList = this.renderDefList.bind(this);
      this.view.btnCancel.onClick = this.onCancelClick.bind(this);
      this.view.searchResourcesBtn.onClick = this.onSearchBtnClick.bind(this);
    }
 };
});