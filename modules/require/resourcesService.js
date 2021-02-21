define(['httpResourcesService'], function (httpImpl) {
  var concreteImpl = httpImpl;
  return {
    addResources: concreteImpl.addResources,
    findResources: concreteImpl.findResources,
    getResources: concreteImpl.getResources,
  };
});