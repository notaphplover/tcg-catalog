import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { Builder } from '../../../../foundation/common/modules/Builder';
import { Handler } from '../../../../foundation/common/modules/Handler';
import { FastifyReplyFromResponseBuilder } from '../../../../foundation/http/adapter/fastify/builders/FastifyReplyFromResponseBuilder';
import { RequestWithBodyFromFastifyRequestBuilder } from '../../../../foundation/http/adapter/fastify/builders/RequestWithBodyFromFastifyRequestBuilder';
import { HttpNestFastifyController } from '../../../../foundation/http/adapter/nest/controllers/HttpNestFastifyController';
import { ErrorV1ResponseFromErrorBuilder } from '../../../../foundation/http/application/builders/ErrorV1ResponseFromErrorBuilder';
import { RequestWithBody } from '../../../../foundation/http/application/models/RequestWithBody';
import { Response } from '../../../../foundation/http/application/models/Response';
import { ResponseWithBody } from '../../../../foundation/http/application/models/ResponseWithBody';
import { PostV1CardsSearchesHttpRequestController } from '../../../application/controllers/PostV1CardsSearchHttpRequestController';

@Controller('v1/cards/searches')
export class PostV1CardsSearchesHttpRequestNestController extends HttpNestFastifyController<RequestWithBody> {
  constructor(
    @Inject(RequestWithBodyFromFastifyRequestBuilder)
    requestBuilder: Builder<RequestWithBody, [FastifyRequest]>,
    @Inject(PostV1CardsSearchesHttpRequestController)
    requestController: Handler<
      [RequestWithBody],
      Response | ResponseWithBody<unknown>
    >,
    @Inject(ErrorV1ResponseFromErrorBuilder)
    responseFromErrorBuilder: Builder<
      Response | ResponseWithBody<unknown>,
      [unknown]
    >,
    @Inject(FastifyReplyFromResponseBuilder)
    resultBuilder: Builder<
      FastifyReply,
      [Response | ResponseWithBody<unknown>, FastifyReply]
    >,
  ) {
    super(
      requestBuilder,
      requestController,
      responseFromErrorBuilder,
      resultBuilder,
    );
  }

  @Post()
  public override async handle(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    await super.handle(request, reply);
  }
}
