define(['topicsService'], function (service) {
  return {
    resources: [
      { newResourceTitle: 'BBC', newResourceUrl: 'bbc.com' },
      { newResourceTitle: 'DW', newResourceUrl: 'dw.com' },
      { newResourceTitle: 'Reuters', newResourceUrl: 'reuters.com' },
      { newResourceTitle: 'NYTimes', newResourceUrl: 'nytimes.com' },
      { newResourceTitle: 'The Daily Telegraph', newResourceUrl: 'telegraf.co.uk' },
    ],

    showNewResources: function(resources) {
      this.view.noNewResources.isVisible = false;
      this.view.newResourcesSegment.widgetDataMap = {
        newResourceTitle: 'site_name',
        newResourceUrl: 'site_url',
        newResourceSwitch: 'switch',
      };
      this.view.newResourcesSegment.setData(resources);
      this.view.newResourcesSegment.isVisible = true;
      this.view.addResourcesBtn.isVisible = true;
    },
    
    showSearchErr: function() {
      alert('there is no resources at this domain');
      this.view.noNewResources.isVisible = true;
      this.view.newResourcesSegment.isVisible = false;
      this.view.addResourcesBtn.isVisible = false;
    },
    
    findNewResources: function() {
      service.getResources(this.view.resourcesSearchInput.text, this.showNewResources, this.showSearchErr);
    },

    addNewResources: function() {
      var resources = this.view.newResourcesSegment.data.filter(function(rowData) {
        return !rowData.switch || rowData.switch === '0.0';
      });
      alert(resources);
    },

    init: function() {
      this.view.addResourcesBtn.onClick = this.addNewResources.bind(this);
      this.view.searchResourcesBtn.onClick = this.findNewResources.bind(this);
    }
 };
});