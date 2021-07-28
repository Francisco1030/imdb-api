const DeleteUserCommonUseCase = require('../../../../../src/app/use-case/user/common/delete/delete-user-common');
const UserRepositorySpy = require('../../../../mocks/user-repository');
const ValidateUserServiceSpy = require('../../../../mocks/validate-user-service');
const OutputBoundary = require('../../../../../src/app/use-case/user/common/delete/output-boundary');
const { ValidationError } = require('../../../../../src/shared/utils/errors');

const makeUserCommonSpyData = () => ({
  id: 'any-id',
  name: 'any-name',
  email: 'any-email',
  password: 'password',
  roleId: 'd0fd3a89-486f-4826-ba8b-71e5191867c7',
})

const makeSut = () => {
  const userRepositorySpy = new UserRepositorySpy();
  const userCommon = makeUserCommonSpyData();
  const validateUserServiceSpy = new ValidateUserServiceSpy({
    userRepository: userRepositorySpy
  });

  const sut = new DeleteUserCommonUseCase({
    userRepository: userRepositorySpy,
    validateUserService: validateUserServiceSpy

  });

  return {
    sut,
    userCommon,
    userRepositorySpy
  }
}

const mockReturnUserCommonRepository = (userRepositorySpy, userCommon) => {
  const mockReturn = {
    ...userCommon,
    createdAt: 'any-createdAt',
    updatedAt: 'any-updatedAt',
    deletedAt: 'any-date',
  };
  userRepositorySpy.fetchOne.mockReturnValue(mockReturn);
  userRepositorySpy.delete.mockReturnValue(mockReturn);
  return mockReturn;
}

describe.skip("use-case: delete user common", () => {

  test("Should return user deleted", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    const returnMocks = mockReturnUserCommonRepository(userRepositorySpy, userCommon);
    const userCommonUpdated = await sut.handle(userCommon);
    const expected = {
      id: returnMocks.id,
      name: returnMocks.name,
      email: returnMocks.email,
      deletedAt: returnMocks.deletedAt,
    };

    expect(userCommonUpdated).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    mockReturnUserCommonRepository(userRepositorySpy, userCommon);
    const userAdminUpdated = await sut.handle(userCommon);

    expect(userAdminUpdated).toBeInstanceOf(OutputBoundary);
  });

  test("Should validate deletedAt is not null", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    const returnMocks = mockReturnUserCommonRepository(userRepositorySpy, userCommon);
    const userCommonUpdated = await sut.handle(userCommon);

    expect(userCommonUpdated).not.toBeNull();
  });

  test("Should call handle", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();

    jest.spyOn(sut, sut.handle.name);
    mockReturnUserCommonRepository(userRepositorySpy, userCommon);

    await sut.handle(userCommon);

    expect(sut.handle).toHaveBeenCalled();
    expect(sut.handle).toHaveBeenCalledTimes(1);
    expect(sut.handle).toHaveBeenCalledWith(userCommon);
  });

  // test("Should call delete", async () => {
  //   const { sut, userCommon, userRepositorySpy } = makeSut();
  //   const expected = mockReturnUserCommonRepository(userRepositorySpy, userCommon);

  //   await sut.handle(userCommon);

  //   expect(userRepositorySpy.delete).toHaveBeenCalled();
  //   expect(userRepositorySpy.delete).toHaveBeenCalledTimes(1);
  //   expect(userRepositorySpy.delete).toHaveBeenCalledWith(expected);
  // });

  // test("Should call fetchOne", async () => {
  //   const { sut, userCommon, userRepositorySpy } = makeSut();
  //   mockReturnUserCommonRepository(userRepositorySpy, userCommon);

  //   await sut.handle(userCommon);

  //   expect(userRepositorySpy.fetchOne).toHaveBeenCalled();
  //   expect(userRepositorySpy.fetchOne).toHaveBeenCalledTimes(1);
  //   expect(userRepositorySpy.fetchOne).toHaveBeenCalledWith({ id: userCommon.id });
  // });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new DeleteUserCommonUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  // test("Should validate user Common", async () => {
  //   const { sut, userCommon, userRepositorySpy } = makeSut();
  //   const userNotCommon = { ...userCommon, roleId: 'roleId-admin' };

  //   mockReturnUserCommonRepository(userRepositorySpy, userNotCommon);

  //   await expect(sut.handle(userNotCommon)).rejects.toThrow();
  //   await expect(sut.handle(userNotCommon)).rejects.toThrow(ValidationError);
  //   await expect(sut.handle(userNotCommon)).rejects.toThrow("Usuario é admin");
  // });

});
