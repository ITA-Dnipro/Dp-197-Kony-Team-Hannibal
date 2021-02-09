define(function () {
    return {
       segmentBasicConf: {
         id: "newResources",
         isVisible: true,
         widgetSkin: "seg2Normal",
         rowSkin: "seg2Normal",
         rowFocusSkin: "seg2Focus",
         alternateRowSkin: "seg2Normal",
         rowTemplate: newResourceTemplate,
      },
      segmentLayoutConf: {
        padding: [5, 5, 5, 5],
        margin: [5, 5, 5, 5],
        containerWeight: 100
      },
      pspConf: {
        border: constants.SEGUI_BORDER_TOP_ONLY,
        defaultSelection: true
      },
    };
});