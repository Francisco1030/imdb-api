module.exports = class MovieVote {
  constructor(data) {
    this.id = data.id;
    this.note = data.note;
    this.userId = data.userId;
    this.movieId = data.movieId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
};
