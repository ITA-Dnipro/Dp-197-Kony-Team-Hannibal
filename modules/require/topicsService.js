define(["httpTopicsService", "fabricTopicsService"], function (storeImpl, fabricImpl) {
  var concretImpl = fabricImpl;
    return {
      getResourceTopics: concretImpl.getResourceTopics,
    };
});