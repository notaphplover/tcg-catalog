import { Module } from '@nestjs/common';

import { EnvModule } from '../../../../environment/adapter/nest/modules/EnvModule';
import { MongoDbModule } from '../../../../foundation/db/adapter/nest/modules/MongoDbModule';

@Module({
  imports: [EnvModule, MongoDbModule],
})
export class AppModule {}
