const BaseRepository = require('../../../domain/repositories/base-crud-repository');
const { NotFoundError } = require('../../../shared/utils/errors');
const knex = require('../../config/knex');

module.exports = class KnexBaseRepository extends BaseRepository {
  constructor() {
    super();
    this.queryBuilder = knex;
  }

  get conn() {
    return this.queryBuilder;
  }

  get entity() {
    throw new Error('Method not implement');
  }

  get table() {
    throw new Error('Method not implement');
  }

  async create(data) {
    const entity = new this.entity(data);
    await this.queryBuilder(this.table).insert(entity);

    return entity;
  }

  async fetchOne(where) {
    const [record] = await this.queryBuilder(this.table).where(where);
    if (!record) throw new NotFoundError(`${this.entity.name} not found!`);
    const entity = new this.entity(record);

    return entity;
  }

  async fetchAll(filters) {
    const query = this.queryBuilder(this.table)
      .where({ deletedAt: null });

    let records;
    const isFilter = Object.keys(filters).length;

    if (isFilter) {
      [records] = await Promise.all(Object.entries(filters).map(async ([key, value]) =>
        query.where(key, 'like', `%${value}%`)
      ));
    } else {
      records = await query;
    }

    const entities = records.map((record) => new this.entity(record));

    return entities;
  }

  async update(data) {
    const entity = new this.entity(data);
    await this.queryBuilder(this.table).where({ id: entity.id }).update(data);

    return entity;
  }

  async delete(data) {
    return await this.update({ ...data, deletedAt: new Date() });
  }
};
