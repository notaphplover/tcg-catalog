import { Module } from '@nestjs/common';

import { HttpModule } from '../../../../foundation/http/adapter/nest/modules/HttpModule';
import { ValidationModule } from '../../../../foundation/validation/adapter/nest/modules/ValidationModule';
import { PostV1CardsSearchesHttpRequestController } from '../../../application/controllers/PostV1CardsSearchHttpRequestController';
import { PostV1CardsSearchesRequestParamHandler } from '../../../application/handlers/PostV1CardsSearchesRequestParamHandler';
import { PostV1CardsSearchesHttpRequestNestController } from '../../fastify/controllers/PostV1CardsSearchesHttpRequestNestController';
import { CardModule } from './CardModule';

@Module({
  controllers: [PostV1CardsSearchesHttpRequestNestController],
  imports: [CardModule, HttpModule, ValidationModule],
  providers: [
    PostV1CardsSearchesHttpRequestController,
    PostV1CardsSearchesRequestParamHandler,
  ],
})
export class CardHttpModule {}
