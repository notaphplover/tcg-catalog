import { Module } from '@nestjs/common';

import { CardManagementInputPort } from '../../../application/ports/input/CardManagementInputPort';
import { CardDbModule } from './CardDbModule';

@Module({
  exports: [CardManagementInputPort],
  imports: [CardDbModule],
  providers: [CardManagementInputPort],
})
export class CardModule {}
