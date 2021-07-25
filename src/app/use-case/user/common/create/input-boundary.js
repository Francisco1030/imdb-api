module.exports = class InputBoundary {
  constructor(input) {
    this.id = input.id;
    this.name = input.name;
    this.roleId = input.roleId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.deletedAt = input.deletedAt;
  }
};
