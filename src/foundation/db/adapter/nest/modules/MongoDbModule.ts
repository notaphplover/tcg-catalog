import { Module } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

import { CardDb } from '../../../../../cards/adapter/db/models/CardDb';
import { EnvModule } from '../../../../../environment/adapter/nest/modules/EnvModule';
import { EnvironmentService } from '../../../../../environment/application/services/EnvironmentService';
import { DbName } from '../models/DbName';
import { mongoCardCollectionSymbol } from '../models/mongoCardCollectionSymbol';
import { mongoClientSymbol } from '../models/mongoClientSymbol';
import { MongoClientShutdown } from '../services/MongoClientShutdown';

@Module({
  exports: [mongoCardCollectionSymbol],
  imports: [EnvModule],
  providers: [
    {
      inject: [EnvironmentService],
      provide: mongoClientSymbol,
      useFactory: async (
        environmentService: EnvironmentService,
      ): Promise<MongoClient> =>
        MongoClient.connect(
          environmentService.getEnvironment().mongoDbConnectionUrl.toString(),
        ),
    },
    {
      inject: [EnvironmentService, mongoClientSymbol],
      provide: mongoCardCollectionSymbol,
      useFactory: (
        environmentService: EnvironmentService,
        mongoClient: MongoClient,
      ): Collection<CardDb> =>
        mongoClient
          .db(environmentService.getEnvironment().mongoDbName)
          .collection<CardDb>(DbName.cards),
    },
    MongoClientShutdown,
  ],
})
export class MongoDbModule {}
