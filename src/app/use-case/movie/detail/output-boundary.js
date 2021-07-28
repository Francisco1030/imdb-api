module.exports = class OutputBoundary {
  constructor(output) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.genre = output.genre;
    this.author = output.author;
    this.director = output.director;
    this.average = output.average;
  }
};
