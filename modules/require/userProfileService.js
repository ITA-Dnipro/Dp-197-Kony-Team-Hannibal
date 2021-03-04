define(['storeUserProfileService', 'fabricUserProfileService'], function (storeImpl, fabricImpl) {
    var concreteImpl = fabricImpl;
    return {
      editUser: concreteImpl.editUser,
      getUserProfileData: concreteImpl.getUserProfileData,
      changePassword: concreteImpl.changePassword,
    };
});