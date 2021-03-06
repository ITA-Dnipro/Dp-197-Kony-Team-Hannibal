define(['utils', "articleService"], function(utils, service) {
  
  function errorCb(err) {
     alert(err); 
  }

  
  function onRowClicked(widget, sectionIdx, rowIdx) {
    var newsToShow = new NewsModel(widget.data[rowIdx].newsTitle, widget.data[rowIdx].logo, widget.data[rowIdx].link, widget.data[rowIdx].pubDate);
    appStorage.newsToShow = newsToShow;
    utils.navigateToForm('formNewsPage');
  }
  

  return {
    onInit: function() {
      this.view.HeaderControl.onBackClicked = this.onBackBtn.bind(this);
      this.view.preShow = this.onFormShowed.bind(this);
      this.view.articlesList.onRowClick = onRowClicked.bind(this);
    },
    
    onBackBtn: function() {
        utils.navigateToForm('formUserProfile');
      },
    
    deleteClick: function(thisButton, list) {
      var selectedRowItem = list.widgetInfo.selectedRowItems[0];
      var self = this;
      utils.confirmAlert("Are you sure that you want to delete ?", function() {
        service.deleteArticle(selectedRowItem.id, self.renderList, errorCb);
      });
    },
    
    renderList: function() {
      var self = this;
      if (appStorage.articles.length < 1) {
        this.view.lblEmpty.isVisible = true;
      } else {
        this.view.lblEmpty.isVisible = false;
      }
      var dataNews = appStorage.articles.map(function(item) {
        item.articleBtnDelete = {
          "onClick": self.deleteClick.bind(this)
        };
        return item;
      });
      this.view.articlesList.setData(dataNews);      
    },
    
    
    onFormShowed: function() {
       this.renderList();
     },  
    };
 });
