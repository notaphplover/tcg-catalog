import mongodb, { Document } from 'mongodb';

import { PaginationQuery } from '../../../domain/models/PaginationQuery';
import { MongoDbSearchOutputAdapter } from './MongoDbSearchOutputAdapter';

export abstract class MongoDbPaginatedSearchOutputAdapter<
  TModel,
  TModelDb extends Document,
  TOutputModelDb extends Document,
  TQuery extends PaginationQuery,
> extends MongoDbSearchOutputAdapter<TModel, TModelDb, TOutputModelDb, TQuery> {
  protected override buildFindCursor(
    query: TQuery,
    mongoDbQuery: mongodb.Filter<TModelDb>,
  ): mongodb.FindCursor<TOutputModelDb> {
    let findCursor: mongodb.FindCursor<TOutputModelDb> = super.buildFindCursor(
      query,
      mongoDbQuery,
    );

    if (query.limit !== undefined) {
      findCursor = findCursor.limit(query.limit);
    }

    if (query.offset !== undefined) {
      findCursor = findCursor.skip(query.offset);
    }

    return findCursor;
  }
}
