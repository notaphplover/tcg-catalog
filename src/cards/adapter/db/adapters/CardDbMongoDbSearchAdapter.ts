import { Inject, Injectable } from '@nestjs/common';
import { Collection, Filter } from 'mongodb';

import { Builder } from '../../../../foundation/common/modules/Builder';
import { MongoDbPaginatedSearchOutputAdapter } from '../../../../foundation/db/adapter/mongodb/adapter/MongoDbPaginatedSearchOutputAdapter';
import { mongoCardCollectionSymbol } from '../../../../foundation/db/adapter/nest/models/mongoCardCollectionSymbol';
import { Card } from '../../../domain/models/Card';
import { CardFindQuery } from '../../../domain/models/CardFindQuery';
import { CardDbFilterFromFindCardQueryBuilder } from '../builders/CardDbFilterFromFindCardQueryBuilder';
import { CardFromCardDbBuilder } from '../builders/CardFromCardDbBuilder';
import { CardDb } from '../models/CardDb';

@Injectable()
export class CardDbMongoDbSearchAdapter extends MongoDbPaginatedSearchOutputAdapter<
  Card,
  CardDb,
  CardDb,
  CardFindQuery
> {
  constructor(
    @Inject(mongoCardCollectionSymbol)
    collection: Collection<CardDb>,
    @Inject(CardFromCardDbBuilder)
    cardFromCardDbBuilder: Builder<Card, [CardDb]>,
    @Inject(CardDbFilterFromFindCardQueryBuilder)
    cardDbFilterFromFindCardQueryBuilder: Builder<
      Filter<CardDb>,
      [CardFindQuery]
    >,
  ) {
    super(
      collection,
      cardFromCardDbBuilder,
      cardDbFilterFromFindCardQueryBuilder,
    );
  }
}
