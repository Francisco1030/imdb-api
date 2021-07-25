module.exports = class OutputBoundary {
  constructor(output) {
    this.id = output.id;
    this.name = output.name;
    this.roleId = output.roleId;
    this.createdAt = output.createdAt;
    this.updatedAt = output.updatedAt;
    this.deletedAt = output.deletedAt;
  }
};
