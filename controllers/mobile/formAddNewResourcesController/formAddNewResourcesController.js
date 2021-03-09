define(['resourcesService', 'utils'], function (resourcesService, utils) {
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
      kony.application.dismissLoadingScreen();
      this.view.noNewResources.isVisible = true;
      this.view.newResourcesSegment.isVisible = false;
      this.view.addResourcesBtn.isVisible = false;
    },
    
    showNewResources: function(resources) {
      kony.application.dismissLoadingScreen();
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
      kony.application.dismissLoadingScreen();
      alert(err);
    },
    
    findNewResources: function() {
      kony.application.showLoadingScreen('slWatchForm', 'Please wait', constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, constants.APPLICATION_MODE_NATIVE);
      resourcesService.findResources(this.view.resourcesSearchInput.text, this.showResults, this.showErr);
    },

    addNewResources: function() {
      var selectedResources = this.view.newResourcesSegment.data.filter(function(rowData) {
        return !rowData.switch || rowData.switch === '0.0';
      });
      var uniqResources = selectedResources.filter(function(newRes) {
        return !appStorage.userResources.some(function(oldRes) {
          return oldRes.url === newRes.url;
        });
      });
      if (uniqResources.length === 0) {
        this.showErr('There is nothing to add. Maybe it is because you didn\'t choose any resource or choosen resources have already been added to the app');
        return;
      }
      resourcesService.addResources(appStorage.userId, uniqResources, function() {
        resourcesService.getUserResources(appStorage.userId, function(newResources) {
          appStorage.userResources = newResources;
          utils.navigateToForm('formNewsProviders');
        }, alert);
      }, alert);
    },
    
    onBack: function () {
      utils.navigateToForm('formNewsProviders');
    },

    init: function() {
      this.view.addResourcesBtn.onClick = this.addNewResources.bind(this);
      this.view.searchResourcesBtn.onClick = this.findNewResources.bind(this);
      this.view.HeaderControl.onBackClicked = this.onBack.bind(this);
      this.view.onHide = this.clearFormState.bind(this);
    }
 };
});