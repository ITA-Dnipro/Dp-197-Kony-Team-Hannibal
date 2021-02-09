define(['newResourcesConfigs'], function (configs) {
  return {
    resources: [
      { newResourceTitle: 'BBC', newResourceUrl: 'bbc.com' },
      { newResourceTitle: 'DW', newResourceUrl: 'dw.com' },
      { newResourceTitle: 'Reuters', newResourceUrl: 'reuters.com' },
      { newResourceTitle: 'NYTimes', newResourceUrl: 'nytimes.com' },
      { newResourceTitle: 'The Daily Telegraph', newResourceUrl: 'telegraf.co.uk' },
    ],

    findNewResources: function() {
      alert('alert');
      var segment = new kony.ui.SegmentedUI2(configs.segmentBasicConf, configs.segmentLayoutConf, configs.pspConf);
      segment.setData(this.resources);
      this.view.newResourcesContainer.add(segment);
    },

    addNewResources: function() {
    
    },

    init: function() {
      alert('i am initted ');
      this.view.addResourcesBtn.onClick = this.addNewResources.bind(this);
      this.view.searchResourcesBtn.onClick = this.findNewResources.bind(this);
    }
 };
});