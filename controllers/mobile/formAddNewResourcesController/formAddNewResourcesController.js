define(['topicsService', 'utils'], function (service, utils) {
  return {
    clearFormState: function() {
      this.view.resourcesSearchInput.text = '';
      this.view.noNewResources.isVisible = false;
      this.view.newResourcesSegment.isVisible = false;
      this.view.addResourcesBtn.isVisible = false;
    },
    
    showResults: function(results) {
      if (results.length > 0) {
        this.showNewResources(results);
      } else {
        this.showNullResult();
      }
    },
    
    showNullResult: function() {
      alert('there is no resources at this domain');
      this.view.noNewResources.isVisible = true;
      this.view.newResourcesSegment.isVisible = false;
      this.view.addResourcesBtn.isVisible = false;
    },
    
    showNewResources: function(resources) {
      this.view.noNewResources.isVisible = false;
      this.view.newResourcesSegment.widgetDataMap = {
        newResourceTitle: 'name',
        newResourceUrl: 'url',
        newResourceSwitch: 'switch',
      };
      this.view.newResourcesSegment.setData(resources);
      this.view.newResourcesSegment.isVisible = true;
      this.view.addResourcesBtn.isVisible = true;
    },
    
    showErr: function (err) {
      alert(err);
    },
    
    findNewResources: function() {
      service.getResources(this.view.resourcesSearchInput.text, this.showResults, this.showErr);
    },

    addNewResources: function() {
      var selectedResources = this.view.newResourcesSegment.data.filter(function(rowData) {
        return !rowData.switch || rowData.switch === '0.0';
      }).map(function(resource) {
        return new NewsResourceModel(resource.name,resource.url, resource.logo);
      });
      var uniqResources = selectedResources.filter(function(newRes) {
        return !appStorage.resources.some(function(oldRes) {
          return oldRes.url === newRes.url;
        });
      });
      appStorage.resources = appStorage.resources.concat(uniqResources);
      utils.navigateToForm('formNewsProviders');
    },

    init: function() {
      this.view.addResourcesBtn.onClick = this.addNewResources.bind(this);
      this.view.searchResourcesBtn.onClick = this.findNewResources.bind(this);
      this.view.btnBack.onClick = function() {
        utils.navigateToForm('formNewsProviders');
      };
      this.view.onHide = this.clearFormState.bind(this);
    }
 };
});