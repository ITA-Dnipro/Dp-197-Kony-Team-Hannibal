define(["httpTopicsService"], function (service) {
    return {
      getResourceTopics: service.getResourceTopics,
      getResources: service.getResources,
    };
});