define(['utils'], function(utils) { 
  
  function onDelClicked() {
    alert("Hello Dima");
  }
  
  function onRowClicked(widget, sectionIdx, rowIdx) {
    var newsToShow = new NewsModel(widget.data[rowIdx].newsTitle, widget.data[rowIdx].logo, widget.data[rowIdx].link, widget.data[rowIdx].pubDate);
    appStorage.newsToShow = newsToShow;
    utils.navigateToForm('formNewsPage');
    
  }
  

  return {
    onInit: function() {
      this.view.HeaderControl.onBackClicked = this.onBackBtn.bind(this);
      this.view.postShow = this.onFormShowed.bind(this);
      this.view.articlesList.onRowClick = onRowClicked.bind(this);
    },
    
    onBackBtn: function() {
        utils.navigateToForm('formUserProfile');
      },
    
    onFormShowed: function() {
      alert(appStorage.articles);
      var dataNews = appStorage.articles.map(function(item) {
        item.articleBtnDelete = {
          "onClick": onDelClicked.bind(this)
        };
        return item;
      });
      this.view.articlesList.setData(dataNews);
    },  
    };
  


 });