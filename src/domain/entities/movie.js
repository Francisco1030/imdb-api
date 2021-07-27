module.exports = class Movie {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.genre = data.genre;
    this.author = data.author;
    this.director = data.director;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
};
