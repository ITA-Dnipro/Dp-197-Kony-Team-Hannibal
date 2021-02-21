define(['httpResourcesService'], function (httpImpl) {
    return {
      findResources: httpImpl.findResources,
    };
});