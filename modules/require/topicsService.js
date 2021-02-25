define(["httpTopicsService", "fabricTopicsService"], function (storeImpl, fabricImpl) {
  var specific = fabricImpl;
    return {
      getResourceTopics: specific.getResourceTopics,
    };
});