import { Module } from '@nestjs/common';

import { CardHttpModule } from '../../../../cards/adapter/nest/modules/CardHttpModule';
import { EnvModule } from '../../../../environment/adapter/nest/modules/EnvModule';
import { MongoDbModule } from '../../../../foundation/db/adapter/nest/modules/MongoDbModule';

@Module({
  imports: [CardHttpModule, EnvModule, MongoDbModule],
})
export class AppModule {}
