import { ClassConstructor } from 'class-transformer';
import {
  DeepPartial,
  FindManyOptions,
  Repository as Entity,
  FindOptionsWhere,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

interface RepositoryOptions<T> {
  baseClass: ClassConstructor<T>;
}

interface UpdateRelationFilter {
  _id: string;
}

export class Repository<T> {
  constructor(
    private readonly entity: Entity<T>,
    private readonly repositoryOptions: RepositoryOptions<T>,
  ) {}

  public async count(filter: FindOptionsWhere<T>) {
    return this.entity.count({ where: filter });
  }

  public async create(entity: DeepPartial<T>): Promise<T> {
    return this.entity.save(entity);
  }

  public async createMany(entity: DeepPartial<T>[]): Promise<T[]> {
    return this.entity.save(entity);
  }

  public async delete(filter: FindOptionsWhere<T>) {
    return this.entity.delete(filter);
  }

  public async deleteAndGet(
    filter: FindOptionsWhere<T> | FindOptionsWhere<T>[] = [],
  ) {
    const entity = await this.entity.findOne({ where: filter });

    await this.entity.remove(entity);

    return entity;
  }

  public async exists(filter: FindOptionsWhere<T>) {
    const count = await this.count(filter);

    return count > 0;
  }

  public async find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(options || {});
  }

  public async findOne(filter: FindOptionsWhere<T>): Promise<T> {
    return this.entity.findOne({ where: filter });
  }

  public async updateOne(
    filter: FindOptionsWhere<T>,
    entity: QueryDeepPartialEntity<T>,
  ) {
    return this.entity.update(filter, entity);
  }

  public async updateOneAndGet(
    filter: FindOptionsWhere<T>,
    entity: QueryDeepPartialEntity<T>,
  ) {
    await this.entity.update(filter, entity);

    return this.entity.findOne({ where: filter });
  }

  public async updateRelation(
    updateRelationFilter: UpdateRelationFilter,
    updateEntity: DeepPartial<T>,
  ) {
    return this.entity.save({ ...updateRelationFilter, ...updateEntity });
  }
}
