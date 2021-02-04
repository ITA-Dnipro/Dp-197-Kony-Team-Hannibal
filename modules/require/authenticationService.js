define(['storeAuthService', 'fabricAuthService'], function (storeImpl, fabricImpl) {
    var concreteImpl = storeImpl;
    return {
      findUser: concreteImpl.checkUserCredentials,
      registerUser: concreteImpl.registerUser,
    };
});