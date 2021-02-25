define(['httpNewsService'], function (storeImpl) {
    return {
      getFeedData: storeImpl.getFeedData,
    };
});