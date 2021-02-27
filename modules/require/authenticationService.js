define(['storeAuthService', 'fabricAuthService'], function (storeImpl, fabricImpl) {
    var concreteImpl = fabricImpl;
    return {
      findUser: concreteImpl.findUser,
      registerUser: concreteImpl.registerUser,
    };
});