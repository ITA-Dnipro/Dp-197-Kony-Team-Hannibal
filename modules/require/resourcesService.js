define(['storeResourcesService', 'fabricResourcesService'], function (httpImpl, fabricImpl) {
  var concreteImpl = fabricImpl;
  return {
    addResources: concreteImpl.addResources,
    findResources: concreteImpl.findResources,
    getUserResources: concreteImpl.getUserResources,
    deleteResource: concreteImpl.deleteResource,
  };
});