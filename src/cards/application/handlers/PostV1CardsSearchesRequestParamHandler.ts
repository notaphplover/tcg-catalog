import { Inject, Injectable } from '@nestjs/common';

import { Handler } from '../../../foundation/common/modules/Handler';
import { RequestWithBody } from '../../../foundation/http/application/models/RequestWithBody';
import { AjvJsonSchemaValidatorProvider } from '../../../foundation/validation/adapter/ajv/services/AjvJsonSchemaValidatorProvider';
import { RequestBodyParamHandler } from '../../../foundation/validation/application/handlers/RequestBodyParamHandler';
import { JsonSchemaId } from '../../../foundation/validation/application/models/JsonSchemaId';
import { CardFindQuery } from '../../domain/models/CardFindQuery';

@Injectable()
export class PostV1CardsSearchesRequestParamHandler
  extends RequestBodyParamHandler<CardFindQuery>
  implements Handler<[RequestWithBody], [CardFindQuery]>
{
  constructor(
    @Inject(AjvJsonSchemaValidatorProvider)
    ajvJsonSchemaValidatorProvider: AjvJsonSchemaValidatorProvider,
  ) {
    super(ajvJsonSchemaValidatorProvider.provide(JsonSchemaId.cardFindQuery));
  }
}
