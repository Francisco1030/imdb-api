const UpdateUserCommonUseCase = require('../../../../../src/app/use-case/user/common/update/update-user-common');
const OutputBoundary = require('../../../../../src/app/use-case/user/common/update/output-boundary');
const UserRepositorySpy = require('../../../../mocks/user-repository');
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

  const sut = new UpdateUserCommonUseCase({
    userRepository: userRepositorySpy
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
    deletedAt: null,
  };
  userRepositorySpy.fetchOne.mockReturnValue(mockReturn);
  userRepositorySpy.update.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: update user common", () => {

  test("Should return user", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    const returnMocks = mockReturnUserCommonRepository(userRepositorySpy, userCommon);
    const expected = {
      id: returnMocks.id,
      name: returnMocks.name,
      email: returnMocks.email,
    };
    const userCommonUpdated = await sut.handle(userCommon);

    expect(userCommonUpdated).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    mockReturnUserCommonRepository(userRepositorySpy, userCommon);
    const userCommonUpdated = await sut.handle(userCommon);

    expect(userCommonUpdated).toBeInstanceOf(OutputBoundary);
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

  test("Should call update", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    const expected = mockReturnUserCommonRepository(userRepositorySpy, userCommon);

    await sut.handle(userCommon);

    expect(userRepositorySpy.update).toHaveBeenCalled();
    expect(userRepositorySpy.update).toHaveBeenCalledTimes(1);
    expect(userRepositorySpy.update).toHaveBeenCalledWith(expected);
  });

  test("Should call fetchOne", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    mockReturnUserCommonRepository(userRepositorySpy, userCommon);

    await sut.handle(userCommon);

    expect(userRepositorySpy.fetchOne).toHaveBeenCalled();
    expect(userRepositorySpy.fetchOne).toHaveBeenCalledTimes(1);
    expect(userRepositorySpy.fetchOne).toHaveBeenCalledWith({ id: userCommon.id });
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new UpdateUserCommonUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should validate user common", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    const userNotAdmin = { ...userCommon, roleId: 'roleId-admin' };

    mockReturnUserCommonRepository(userRepositorySpy, userNotAdmin);

    await expect(sut.handle(userNotAdmin)).rejects.toThrow();
    await expect(sut.handle(userNotAdmin)).rejects.toThrow(ValidationError);
    await expect(sut.handle(userNotAdmin)).rejects.toThrow("Usuario é admin");
  });

});
