define(['storeEditUsersService', 'fabricEditUsersService'], function (storeImpl, fabricImpl) {
    var concreteImpl = storeImpl;
    return {
      editUser: concreteImpl.editUser,
    };
});