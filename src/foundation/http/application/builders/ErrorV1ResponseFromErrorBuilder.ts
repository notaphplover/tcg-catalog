import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ErrorV1 } from '../../../../error/application/models/ErrorV1';
import { AppError } from '../../../../error/domain/models/AppError';
import { AppErrorKind } from '../../../../error/domain/models/AppErrorKind';
import { Builder } from '../../../common/modules/Builder';
import { ResponseWithBody } from '../models/ResponseWithBody';
import { HttpStatusCodeFromErrorBuilder } from './HttpStatusCodeFromErrorBuilder';
import { JsonResponseBuilder } from './JsonResponseBuilder';

@Injectable()
export class ErrorV1ResponseFromErrorBuilder
  extends JsonResponseBuilder<[unknown]>
  implements Builder<ResponseWithBody<ErrorV1>, [unknown]>
{
  readonly #httpStatusCodeFromErrorBuilder: Builder<number, [AppError]>;

  constructor(
    @Inject(HttpStatusCodeFromErrorBuilder)
    httpStatusCodeFromErrorBuilder: Builder<number, [AppError]>,
  ) {
    super();

    this.#httpStatusCodeFromErrorBuilder = httpStatusCodeFromErrorBuilder;
  }

  public build(error: unknown): ResponseWithBody<ErrorV1> {
    let httpResponse: ResponseWithBody<ErrorV1>;

    if (error instanceof Error) {
      httpResponse = this.#buildHttpResponseFromError(error);
    } else {
      httpResponse = this.#buildHttpResponseFromUnexpectedValue();
    }

    return httpResponse;
  }

  #buildHttpResponseFromError(error: Error): ResponseWithBody<ErrorV1> {
    let httpResponse: ResponseWithBody<ErrorV1>;

    if (AppError.isAppError(error)) {
      httpResponse = this.#buildHttpResponseFromAppError(error);
    } else {
      const appError: AppError = new AppError(
        AppErrorKind.unknown,
        error.message,
        {
          cause: error,
        },
      );

      httpResponse = this.#buildHttpResponseFromAppError(appError);
    }

    return httpResponse;
  }

  #buildHttpResponseFromAppError(error: AppError): ResponseWithBody<ErrorV1> {
    const statusCode: number =
      this.#httpStatusCodeFromErrorBuilder.build(error);
    const errorMessage: string = this.#stringifyError(error);

    return {
      body: {
        description: errorMessage,
      },
      headers: this._getHttpResponseHeaders(),
      statusCode,
    };
  }

  #buildHttpResponseFromUnexpectedValue(): ResponseWithBody<ErrorV1> {
    return {
      body: {
        description: 'Unexpected error occurred while processing the request.',
      },
      headers: this._getHttpResponseHeaders(),
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }

  #stringifyError(error: Error): string {
    return error.message;
  }
}
