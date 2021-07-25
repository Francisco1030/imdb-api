const CreateUserAdminUseCase = require('../../../../../src/app/use-case/user/admin/create/create-user-admin');
const OutputBoundary = require('../../../../../src/app/use-case/user/admin/create/output-boundary');
const UserRepositorySpy = require('../../../../mocks/user-repository');

const makeUserAdminSpyData = () => ({
  id: 'any-id',
  name: 'any-name',
  roleId: 'roleId-admin',
  createdAt: 'any-createdAt',
  updatedAt: 'any-updatedAt',
  deletedAt: null,
})

const makeSut = () => {
  const userRepositorySpy = new UserRepositorySpy();
  const userAdmin = makeUserAdminSpyData();

  const sut = new CreateUserAdminUseCase({
    userRepository: userRepositorySpy
  });

  return {
    sut,
    userAdmin,
    userRepositorySpy
  }
}

const mockReturnUserAdminRepository = (userRepositorySpy, userAdmin) => {
  const mockReturn = { ...userAdmin };
  userRepositorySpy.create.mockReturnValue(mockReturn);
  return mockReturn;
}

describe("use-case: create user admin", () => {

  test("Should return user", async () => {
    const { sut, userAdmin, userRepositorySpy } = makeSut();
    const returnMocks = mockReturnUserAdminRepository(userRepositorySpy, userAdmin);
    const expected = {
      id: returnMocks.id,
      name: returnMocks.name
    };
    const userAdminCreated = await sut.handle(userAdmin);

    expect(userAdminCreated).toEqual(expected);
  });

  test("Should return instanceof OutputBoundary", async () => {
    const { sut, userAdmin, userRepositorySpy } = makeSut();
    mockReturnUserAdminRepository(userRepositorySpy, userAdmin);
    const userAdminCreated = await sut.handle(userAdmin);

    expect(userAdminCreated).toBeInstanceOf(OutputBoundary);
  });

  test("Should call handle", async () => {
    const { sut, userAdmin, userRepositorySpy } = makeSut();

    jest.spyOn(sut, sut.handle.name);
    mockReturnUserAdminRepository(userRepositorySpy, userAdmin);

    await sut.handle(userAdmin);

    expect(sut.handle).toHaveBeenCalled();
    expect(sut.handle).toHaveBeenCalledTimes(1);
    expect(sut.handle).toHaveBeenCalledWith(userAdmin);
  });

  test("Should call create", async () => {
    const { sut, userAdmin, userRepositorySpy } = makeSut();
    mockReturnUserAdminRepository(userRepositorySpy, userAdmin);
    jest.spyOn(userRepositorySpy, 'create');

    await sut.handle(userAdmin);

    expect(userRepositorySpy.create).toHaveBeenCalled();
    expect(userRepositorySpy.create).toHaveBeenCalledTimes(1);
    expect(userRepositorySpy.create).toHaveBeenCalledWith(userAdmin);
  });

  test("Should call handle without parameter", async () => {
    const { sut } = makeSut();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

  test("Should instantiate a use-case without a repository", async () => {
    const sut = new CreateUserAdminUseCase();

    await expect(sut.handle()).rejects.toThrow();
    await expect(sut.handle()).rejects.toThrow(TypeError);
    await expect(sut.handle()).rejects.toThrow("Cannot read property 'id' of undefined");
  });

});
