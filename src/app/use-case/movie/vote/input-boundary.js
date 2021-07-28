module.exports = class InputBoundary {
  constructor(input) {
    this.id = input.id;
    this.note = input.note;
    this.userId = input.userId;
    this.movieId = input.movieId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.deletedAt = input.deletedAt;
  }
};
