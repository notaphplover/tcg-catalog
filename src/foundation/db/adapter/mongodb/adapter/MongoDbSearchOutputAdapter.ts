import { Injectable } from '@nestjs/common';
import mongodb, { Collection, Document } from 'mongodb';

import { Builder } from '../../../../common/modules/Builder';
import { SearchPort } from '../../../application/ports/output/SearchPort';

@Injectable()
export abstract class MongoDbSearchOutputAdapter<
  TModel,
  TModelDb extends Document,
  TOutputModelDb extends Document,
  TQuery,
> implements SearchPort<TModel, TQuery>
{
  constructor(
    protected readonly _collection: Collection<TModelDb>,
    protected readonly _modelDbToModelConverter: Builder<
      TModel,
      [TOutputModelDb]
    >,
    protected readonly _queryToFilterQueryConverter: Builder<
      mongodb.Filter<TModelDb>,
      [TQuery]
    >,
  ) {}

  public async find(query: TQuery): Promise<TModel[]> {
    const mongoDbQuery: mongodb.Filter<TModelDb> =
      this._queryToFilterQueryConverter.build(query);

    const entitiesDbFound: TOutputModelDb[] = await this.buildFindCursor(
      query,
      mongoDbQuery,
    ).toArray();

    const entities: TModel[] = entitiesDbFound.map((entityDb: TOutputModelDb) =>
      this._modelDbToModelConverter.build(entityDb),
    );

    return entities;
  }

  public async findOne(query: TQuery): Promise<TModel | null> {
    const mongoDbQuery: mongodb.Filter<TModelDb> =
      this._queryToFilterQueryConverter.build(query);

    const entityDbFound: TOutputModelDb | null =
      await this._collection.findOne<TOutputModelDb>(
        mongoDbQuery,
        this.getFindOptions(),
      );

    const entity: TModel | null =
      entityDbFound === null
        ? null
        : this._modelDbToModelConverter.build(entityDbFound);

    return entity;
  }

  protected buildFindCursor(
    _query: TQuery,
    mongoDbQuery: mongodb.Filter<TModelDb>,
  ): mongodb.FindCursor<TOutputModelDb> {
    return this._collection.find<TOutputModelDb>(
      mongoDbQuery,
      this.getFindOptions(),
    );
  }

  protected getFindOptions(): mongodb.FindOptions<
    TOutputModelDb extends TModelDb ? TModelDb : TOutputModelDb
  > {
    return {};
  }
}
