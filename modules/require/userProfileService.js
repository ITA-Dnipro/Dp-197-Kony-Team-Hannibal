define(['storeUserProfileService', 'fabricUserProfileService'], function (storeImpl, fabricImpl) {
    var concreteImpl = storeImpl;
    return {
      editUser: concreteImpl.editUser,
    };
});