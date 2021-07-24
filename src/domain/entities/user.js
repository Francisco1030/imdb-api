module.exports = class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.roleId = data.roleId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
};
