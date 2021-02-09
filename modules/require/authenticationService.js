define(['storeAuthService', 'fabricAuthService'], function (storeImpl, fabricImpl) {
    var concreteImpl = storeImpl;
    return {
      findUser: concreteImpl.findUser,
      registerUser: concreteImpl.registerUser,
    };
});