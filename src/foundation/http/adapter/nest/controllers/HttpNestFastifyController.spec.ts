import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

import { FastifyReply, FastifyRequest } from 'fastify';

import { Builder } from '../../../../common/modules/Builder';
import { Handler } from '../../../../common/modules/Handler';
import { Request } from '../../../application/models/Request';
import { RequestWithBody } from '../../../application/models/RequestWithBody';
import { Response } from '../../../application/models/Response';
import { ResponseWithBody } from '../../../application/models/ResponseWithBody';
import { HttpNestFastifyController } from './HttpNestFastifyController';

describe(HttpNestFastifyController.name, () => {
  let requestBuilderMock: jest.Mocked<
    Builder<Request | RequestWithBody, [FastifyRequest]>
  >;
  let requestControllerMock: jest.Mocked<
    Handler<[Request | RequestWithBody], Response | ResponseWithBody<unknown>>
  >;
  let responseFromErrorBuilderMock: jest.Mocked<
    Builder<Response | ResponseWithBody<unknown>, [unknown]>
  >;
  let resultBuilderMock: jest.Mocked<
    Builder<FastifyReply, [Response | ResponseWithBody<unknown>, FastifyReply]>
  >;

  let httpController: HttpNestFastifyController<Request | RequestWithBody>;

  beforeAll(() => {
    requestBuilderMock = {
      build: jest.fn(),
    };
    requestControllerMock = {
      handle: jest.fn(),
    };
    responseFromErrorBuilderMock = {
      build: jest.fn(),
    };
    resultBuilderMock = {
      build: jest.fn(),
    };

    httpController = new HttpNestFastifyController(
      requestBuilderMock,
      requestControllerMock,
      responseFromErrorBuilderMock,
      resultBuilderMock,
    );
  });

  describe('.handle', () => {
    describe('when called', () => {
      let fastifyRequestFixture: FastifyRequest;
      let requestFixture: Request | RequestWithBody;
      let responseFixture: Response | ResponseWithBody<unknown>;
      let fastifyReplyFixture: FastifyReply;

      let result: unknown;

      beforeAll(async () => {
        fastifyRequestFixture = Symbol() as unknown as FastifyRequest;
        requestFixture = Symbol() as unknown as Request | RequestWithBody;
        responseFixture = Symbol() as unknown as
          | Response
          | ResponseWithBody<unknown>;
        fastifyReplyFixture = Symbol() as unknown as FastifyReply;

        requestBuilderMock.build.mockReturnValueOnce(requestFixture);
        requestControllerMock.handle.mockResolvedValueOnce(responseFixture);
        resultBuilderMock.build.mockReturnValueOnce(fastifyReplyFixture);

        result = await httpController.handle(
          fastifyRequestFixture,
          fastifyReplyFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call requestBuilder.build()', () => {
        expect(requestBuilderMock.build).toHaveBeenCalledTimes(1);
        expect(requestBuilderMock.build).toHaveBeenCalledWith(
          fastifyRequestFixture,
        );
      });

      it('should call requestController.handle()', () => {
        expect(requestControllerMock.handle).toHaveBeenCalledTimes(1);
        expect(requestControllerMock.handle).toHaveBeenCalledWith(
          requestFixture,
        );
      });

      it('should call resultBuilder.build()', () => {
        expect(resultBuilderMock.build).toHaveBeenCalledTimes(1);
        expect(resultBuilderMock.build).toHaveBeenCalledWith(
          responseFixture,
          fastifyReplyFixture,
        );
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });

    describe('when called, and requestBuilder.build throws an Error', () => {
      let errorFixture: unknown;

      let fastifyRequestFixture: FastifyRequest;
      let responseFixture: Response | ResponseWithBody<unknown>;
      let fastifyReplyFixture: FastifyReply;

      let result: unknown;

      beforeAll(async () => {
        errorFixture = Symbol();
        fastifyRequestFixture = Symbol() as unknown as FastifyRequest;
        responseFixture = Symbol() as unknown as
          | Response
          | ResponseWithBody<unknown>;
        fastifyReplyFixture = Symbol() as unknown as FastifyReply;

        requestBuilderMock.build.mockImplementationOnce(() => {
          throw errorFixture;
        });
        responseFromErrorBuilderMock.build.mockReturnValueOnce(responseFixture);
        resultBuilderMock.build.mockReturnValueOnce(fastifyReplyFixture);

        result = await httpController.handle(
          fastifyRequestFixture,
          fastifyReplyFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call requestBuilder.build()', () => {
        expect(requestBuilderMock.build).toHaveBeenCalledTimes(1);
        expect(requestBuilderMock.build).toHaveBeenCalledWith(
          fastifyRequestFixture,
        );
      });

      it('should not call requestController.handle()', () => {
        expect(requestControllerMock.handle).not.toHaveBeenCalled();
      });

      it('should call responseFromErrorBuilder.build()', () => {
        expect(responseFromErrorBuilderMock.build).toHaveBeenCalledTimes(1);
        expect(responseFromErrorBuilderMock.build).toHaveBeenCalledWith(
          errorFixture,
        );
      });

      it('should call resultBuilder.build()', () => {
        expect(resultBuilderMock.build).toHaveBeenCalledTimes(1);
        expect(resultBuilderMock.build).toHaveBeenCalledWith(
          responseFixture,
          fastifyReplyFixture,
        );
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
