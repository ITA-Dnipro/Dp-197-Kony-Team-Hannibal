define(['constants', 'topicsService', 'resourcesService', 'utils'], function(constants, topicsService, resourcesService, utils) { 
  
  function showFeeds(feeds) {
    appStorage.feeds = feeds;
    utils.navigateToForm('formNewsFeeds');
  }
  
  function renderErr(err) {
    alert(err);
  }
  
  return {
    deleteResource: function(resId) {
      var self = this;
      resourcesService.deleteResource(appStorage.userId, resId, function() {
        resourcesService.getUserResources(appStorage.userId, function(newResources) {
          appStorage.userResources = newResources;
          self.renderResources();
        }, renderErr);
      }, renderErr);
    },
    
    renderResources: function() {
      var self = this;
      var resources = appStorage.userResources.map(function(res) {
        return {
          lblTitle: res.name,
          imgChannel: res.logo,
          url: res.url,
          btnDelete: {
            onClick: self.deleteResource.bind(self, res.resourceId),
          },
        };
      });
      this.view.newsChannels.setData(resources);
    },
    
    onInit: function() {
      this.view.preShow = this.renderResources.bind(this);
      this.view.postShow = this.onPostShow.bind(this);
      this.view.newsChannels.onRowClick = this.onRowClick.bind(this);
      this.view.userName.onTouchStart = this.moveToProfile.bind(this);
      this.view.btnAddProvider.onClick = function() {
        utils.navigateToForm('formAddNewResources');
      };
    },
    
    onPostShow: function() {
      this.view.userName.text = appStorage.userProfile.login;
    },
    
    moveToProfile: function() {
      var formId = kony.application.getCurrentForm().id;
      utils.navigateToForm('formUserProfile', formId);
    },
  
    onRowClick: function(widget, section, index) {
      var resourceUrl = widget.data[index].url;
      // var topicsApiUrl = constants.FEEDS_API + resourceUrl; For httpIml
      topicsService.getResourceTopics(resourceUrl, showFeeds, renderErr);
    }
  };
 });