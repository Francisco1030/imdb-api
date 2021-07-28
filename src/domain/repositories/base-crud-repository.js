module.exports = class BaseCrudRepository {
  /*
   * @param {Entity} entity
   * @returns {Entity} entity
   */
  create(data) {
    throw new Error('Method not implement');
  }

  /*
   * @param {Object} object
   * @returns {Entity} entity
   */
  fetchOne(where) {
    throw new Error('Method not implement');
  }

  /*
   * @returns {Array} entities
   */
  fetchAll(filters) {
    throw new Error('Method not implement');
  }

  /*
   * @param {Entity} entity
   * @returns {Entity} entity
   */
  update(entity) {
    throw new Error('Method not implement');
  }

  /*
   * @param {Entity} entity
   * @returns {Entity} entity
   */
  delete(id) {
    throw new Error('Method not implement');
  }
};
