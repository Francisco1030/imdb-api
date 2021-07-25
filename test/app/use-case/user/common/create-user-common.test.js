const CreateUserCommonUseCase = require('../../../../../src/app/use-case/user/common/create/create-user-common');
const OutputBoundary = require('../../../../../src/app/use-case/user/common/create/output-boundary');
const UserRepositorySpy = require('../../../../mocks/user-repository');

const makeUserCommonSpyData = () => ({
  id: 'any-id',
  name: 'any-name',
  roleId: 'roleId-common',
  createdAt: 'any-createdAt',
  updatedAt: 'any-updatedAt',
  deletedAt: null,
})

const makeSut = () => {
  const userRepositorySpy = new UserRepositorySpy();
  const userCommon = makeUserCommonSpyData();

  const sut = new CreateUserCommonUseCase({
    userRepository: userRepositorySpy
  });

  return {
    sut,
    userCommon,
    userRepositorySpy
  }
}

const mockReturnUserCommonRepository = (userRepositorySpy, userCommon) => {
  const mockReturn = { ...userCommon };
  userRepositorySpy.create.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: create user common", () => {

  test("Should return user", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    const returnMocks = mockReturnUserCommonRepository(userRepositorySpy, userCommon);
    const expected = {
      id: returnMocks.id,
      name: returnMocks.name
    };
    const userCommonCreated = await sut.handle(userCommon);

    expect(userCommonCreated).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    mockReturnUserCommonRepository(userRepositorySpy, userCommon);
    const userCommonCreated = await sut.handle(userCommon);

    expect(userCommonCreated).toBeInstanceOf(OutputBoundary);
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

  test("Should call create", async () => {
    const { sut, userCommon, userRepositorySpy } = makeSut();
    mockReturnUserCommonRepository(userRepositorySpy, userCommon);
    jest.spyOn(userRepositorySpy, 'create');

    await sut.handle(userCommon);

    expect(userRepositorySpy.create).toHaveBeenCalled();
    expect(userRepositorySpy.create).toHaveBeenCalledTimes(1);
    expect(userRepositorySpy.create).toHaveBeenCalledWith(userCommon);
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new CreateUserCommonUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

});
