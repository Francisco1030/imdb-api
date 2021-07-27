module.exports = class InputBoundary {
  constructor(input) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.genre = input.genre;
    this.author = input.author;
    this.director = input.director;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.deletedAt = input.deletedAt;
    this.userId = input.userId;
  }
};
