import { Module } from '@nestjs/common';

import { MongoDbModule } from '../../../../foundation/db/adapter/nest/modules/MongoDbModule';
import { cardSearchPortSymbol } from '../../../application/ports/output/CardSearchPort';
import { CardDbMongoDbSearchAdapter } from '../../db/adapters/CardDbMongoDbSearchAdapter';
import { CardDbFilterFromCardQueryFilterBuilder } from '../../db/builders/CardDbFilterFromCardQueryFilterBuilder';
import { CardDbFilterFromFindCardQueryBuilder } from '../../db/builders/CardDbFilterFromFindCardQueryBuilder';
import { CardFromCardDbBuilder } from '../../db/builders/CardFromCardDbBuilder';

@Module({
  exports: [cardSearchPortSymbol],
  imports: [MongoDbModule],
  providers: [
    CardDbFilterFromCardQueryFilterBuilder,
    CardDbFilterFromFindCardQueryBuilder,
    CardFromCardDbBuilder,
    {
      provide: cardSearchPortSymbol,
      useClass: CardDbMongoDbSearchAdapter,
    },
  ],
})
export class CardDbModule {}
