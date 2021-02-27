define(['storeResourcesService', 'fabricResourcesService'], function (httpImpl, fabricImpl) {
  var concreteImpl = fabricImpl;
  return {
    addResources: concreteImpl.addResources,
    addStartResources: concreteImpl.addStartResources,
    findResources: concreteImpl.findResources,
    getResources: concreteImpl.getResources,
    deleteResource: concreteImpl.deleteResource,
  };
});