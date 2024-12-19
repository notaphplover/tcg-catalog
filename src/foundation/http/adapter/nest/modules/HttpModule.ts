import { Module } from '@nestjs/common';

import { ErrorV1ResponseFromErrorBuilder } from '../../../application/builders/ErrorV1ResponseFromErrorBuilder';
import { HttpStatusCodeFromErrorBuilder } from '../../../application/builders/HttpStatusCodeFromErrorBuilder';
import { MultipleEntitiesGetResponseBuilder } from '../../../application/builders/MultipleEntitiesGetResponseBuilder';
import { MultipleEntitiesPostResponseBuilder } from '../../../application/builders/MultipleEntitiesPostResponseBuilder';
import { SingleEntityDeleteResponseBuilder } from '../../../application/builders/SingleEntityDeleteResponseBuilder';
import { SingleEntityGetResponseBuilder } from '../../../application/builders/SingleEntityGetResponseBuilder';
import { SingleEntityPatchResponseBuilder } from '../../../application/builders/SingleEntityPatchResponseBuilder';
import { SingleEntityPostResponseBuilder } from '../../../application/builders/SingleEntityPostResponseBuilder';
import { FastifyReplyFromResponseBuilder } from '../../fastify/builders/FastifyReplyFromResponseBuilder';
import { RequestWithBodyFromFastifyRequestBuilder } from '../../fastify/builders/RequestWithBodyFromFastifyRequestBuilder';

@Module({
  exports: [
    ErrorV1ResponseFromErrorBuilder,
    FastifyReplyFromResponseBuilder,
    MultipleEntitiesGetResponseBuilder,
    MultipleEntitiesPostResponseBuilder,
    RequestWithBodyFromFastifyRequestBuilder,
    SingleEntityDeleteResponseBuilder,
    SingleEntityGetResponseBuilder,
    SingleEntityPatchResponseBuilder,
    SingleEntityPostResponseBuilder,
  ],
  providers: [
    ErrorV1ResponseFromErrorBuilder,
    FastifyReplyFromResponseBuilder,
    HttpStatusCodeFromErrorBuilder,
    MultipleEntitiesGetResponseBuilder,
    MultipleEntitiesPostResponseBuilder,
    RequestWithBodyFromFastifyRequestBuilder,
    SingleEntityDeleteResponseBuilder,
    SingleEntityGetResponseBuilder,
    SingleEntityPatchResponseBuilder,
    SingleEntityPostResponseBuilder,
  ],
})
export class HttpModule {}
