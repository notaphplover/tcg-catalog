import { Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { Builder } from '../../../../common/modules/Builder';
import { Response } from '../../../application/models/Response';
import { ResponseWithBody } from '../../../application/models/ResponseWithBody';

@Injectable()
export class FastifyReplyFromResponseBuilder
  implements
    Builder<FastifyReply, [Response | ResponseWithBody<unknown>, FastifyReply]>
{
  public build(
    response: Response | ResponseWithBody<unknown>,
    reply: FastifyReply,
  ): FastifyReply {
    const bodyOrUndefined: unknown = (response as ResponseWithBody<unknown>)
      .body;

    let replyResult: FastifyReply = reply
      .headers(response.headers)
      .status(response.statusCode);

    if (bodyOrUndefined === undefined) {
      replyResult = replyResult.send();
    } else {
      replyResult = replyResult.send(bodyOrUndefined);
    }

    return replyResult;
  }
}
