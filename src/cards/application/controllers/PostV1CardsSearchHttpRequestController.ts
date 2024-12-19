import { Inject, Injectable } from '@nestjs/common';

import { Builder } from '../../../foundation/common/modules/Builder';
import { Handler } from '../../../foundation/common/modules/Handler';
import { ErrorV1ResponseFromErrorBuilder } from '../../../foundation/http/application/builders/ErrorV1ResponseFromErrorBuilder';
import { MultipleEntitiesPostResponseBuilder } from '../../../foundation/http/application/builders/MultipleEntitiesPostResponseBuilder';
import { HttpRequestController } from '../../../foundation/http/application/controllers/HttpRequestController';
import { RequestWithBody } from '../../../foundation/http/application/models/RequestWithBody';
import { Response } from '../../../foundation/http/application/models/Response';
import { ResponseWithBody } from '../../../foundation/http/application/models/ResponseWithBody';
import { Card } from '../../domain/models/Card';
import { CardFindQuery } from '../../domain/models/CardFindQuery';
import { PostV1CardsSearchesRequestParamHandler } from '../handlers/PostV1CardsSearchesRequestParamHandler';
import { CardManagementInputPort } from '../ports/input/CardManagementInputPort';

@Injectable()
export class PostV1CardsSearchesHttpRequestController extends HttpRequestController<
  RequestWithBody,
  [CardFindQuery],
  Card[]
> {
  readonly #cardManagementInputPort: CardManagementInputPort;

  constructor(
    @Inject(PostV1CardsSearchesRequestParamHandler)
    requestParamHandler: Handler<[RequestWithBody], [CardFindQuery]>,
    @Inject(MultipleEntitiesPostResponseBuilder)
    responseBuilder: Builder<Response | ResponseWithBody<Card[]>, [Card[]]>,
    @Inject(ErrorV1ResponseFromErrorBuilder)
    errorV1ResponseFromErrorBuilder: Builder<
      Response | ResponseWithBody<unknown>,
      [unknown]
    >,
    @Inject(CardManagementInputPort)
    cardManagementInputPort: CardManagementInputPort,
  ) {
    super(
      requestParamHandler,
      responseBuilder,
      errorV1ResponseFromErrorBuilder,
    );

    this.#cardManagementInputPort = cardManagementInputPort;
  }

  protected async _handleUseCase(
    cardFindQueryV1: CardFindQuery,
  ): Promise<Card[]> {
    return this.#cardManagementInputPort.search(cardFindQueryV1);
  }
}
