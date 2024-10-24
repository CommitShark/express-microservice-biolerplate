import httpStatus from "http-status";
import { AppDataSource } from "../database/dataSource";
import {
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  ObjectLiteral,
  Repository,
} from "typeorm";
import ApiError from "../lib/ApiError";

export interface ICheckEntityExistence<T> {
  clause: FindOneOptions<T>;
  shouldExist: boolean;
  message?: string;
}

export class MainRepository<T extends ObjectLiteral> {
  public readonly AppDataSource = AppDataSource;
  public readonly Entity: EntityTarget<T>;
  public readonly repo: Repository<T>;

  public constructor(Entity: EntityTarget<T>) {
    this.Entity = Entity;
    this.repo = AppDataSource.manager.getRepository(Entity);
  }

  private identifyChild() {
    return this.Entity.toString();
  }

  public async getById(id: string, key: keyof T = "id") {
    return await this.AppDataSource.manager.findOne(this.Entity, {
      where: {
        [key]: id,
      },
    } as FindOneOptions<T>);
  }

  public async getOne(params: FindOneOptions<T>) {
    return await this.AppDataSource.manager.findOne(this.Entity, params);
  }

  public async checkEntityExistence({
    clause,
    shouldExist,
    message,
  }: ICheckEntityExistence<T>) {
    const entity = await this.AppDataSource!.manager.findOne(
      this.Entity,
      clause
    );

    if (!shouldExist && entity)
      throw new ApiError(
        httpStatus.CONFLICT,
        message || `${this.identifyChild()} already exists.`
      );

    if (shouldExist && !entity)
      throw new ApiError(
        httpStatus.NOT_FOUND,
        message || `${this.identifyChild()} does not exist.`
      );

    return entity;
  }

  public async deleteIfExist(where: FindOptionsWhere<T>) {
    const entity = await this.AppDataSource.manager.findOne(this.Entity, {
      where,
    });

    if (entity) {
      await this.AppDataSource.manager.remove(entity);
    }
  }

  public async deleteMultiple(ids: number[], key: keyof T = "id") {
    const entities = await this.AppDataSource.manager.find(this.Entity, {
      where: {
        [key]: In(ids),
      } as FindOptionsWhere<T>,
    });

    if (entities.length > 0) {
      await this.AppDataSource.manager.remove(entities);
    }
  }

  public async saveEntity(entity: T) {
    return await this.AppDataSource.manager.save(entity);
  }

  public async find(options?: FindManyOptions<T>) {
    return await this.AppDataSource.manager.find(this.Entity, options);
  }

  public async paginatedFind(options?: FindManyOptions<T>) {
    return await this.AppDataSource.manager.findAndCount(this.Entity, options);
  }
}
