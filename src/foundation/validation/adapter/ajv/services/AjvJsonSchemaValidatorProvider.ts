import Ajv, {
  ErrorObject,
  SchemaObject,
  ValidateFunction,
} from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

import { JsonSchemaId } from '../../../application/models/JsonSchemaId';
import { Validator } from '../../../application/models/Validator';

export class AjvJsonSchemaValidatorProvider<TId extends string = string> {
  readonly #idToValidatorMap: Map<string, Validator<unknown>>;
  readonly #ajvInstance: Ajv;
  #initializeIsCalled: boolean;

  constructor() {
    this.#idToValidatorMap = new Map();
    this.#ajvInstance = new Ajv();
    addFormats(this.#ajvInstance);

    this.#initializeIsCalled = false;
  }

  public provide<T>(id: TId): Validator<T> {
    const validator: Validator<unknown> | undefined =
      this.#idToValidatorMap.get(id);

    if (validator === undefined) {
      throw new Error(`No validator found for id "${id}"`);
    }

    return validator as Validator<T>;
  }

  public async initialize(): Promise<void> {
    // A real world scenario would contain a more sophisticated approach
    const jsonSchemas: SchemaObject[] = [
      {
        $id: JsonSchemaId.cardFindNumberEnumQueryFilter,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        anyOf: [
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryAndFilter },
              {
                properties: {
                  filters: {
                    items: {
                      $ref: JsonSchemaId.cardFindNumberEnumQueryFilter,
                    },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            ],
          },
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryListFilter },
              {
                properties: {
                  values: {
                    items: {
                      type: 'number',
                    },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            ],
          },
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryOrFilter },
              {
                properties: {
                  filters: {
                    items: {
                      $ref: JsonSchemaId.cardFindNumberEnumQueryFilter,
                    },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            ],
          },
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryRangeFilter },
              {
                properties: {
                  max: {
                    properties: {
                      value: {
                        type: 'number',
                      },
                    },
                    type: 'object',
                  },
                  min: {
                    properties: {
                      value: {
                        type: 'number',
                      },
                    },
                    type: 'object',
                  },
                },
                type: 'object',
              },
            ],
          },
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryValueFilter },
              {
                properties: {
                  value: {
                    type: 'number',
                  },
                },
                type: 'object',
              },
            ],
          },
        ],
      },
      {
        $id: JsonSchemaId.cardFindQuery,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        additionalProperties: false,
        properties: {
          color: { $ref: JsonSchemaId.cardFindOptionalStringEnumQueryFilter },
          inkCost: { $ref: JsonSchemaId.cardFindNumberEnumQueryFilter },
          kind: { $ref: JsonSchemaId.cardFindStringEnumQueryFilter },
          limit: {
            maximum: 100,
            minimum: 0,
            type: 'integer',
          },
          name: { $ref: JsonSchemaId.cardFindQueryTextFilter },
          offset: {
            minimum: 0,
            type: 'integer',
          },
          rarity: { $ref: JsonSchemaId.cardFindStringEnumQueryFilter },
        },
        required: ['limit'],
        type: 'object',
      },
      {
        $id: JsonSchemaId.cardFindQueryAndFilter,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        additionalProperties: false,
        properties: {
          filters: {
            type: 'array',
          },
          kind: {
            const: 'and',
            type: 'string',
          },
        },
        required: ['filters', 'kind'],
        type: 'object',
      },
      {
        $id: JsonSchemaId.cardFindQueryListFilter,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        additionalProperties: false,
        properties: {
          kind: {
            const: 'list',
            type: 'string',
          },
          values: {
            type: 'array',
          },
        },
        required: ['kind', 'values'],
        type: 'object',
      },
      {
        $id: JsonSchemaId.cardFindQueryNullFilter,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        additionalProperties: false,
        properties: {
          kind: {
            const: 'null',
            type: 'string',
          },
        },
        required: ['kind'],
        type: 'object',
      },
      {
        $id: JsonSchemaId.cardFindQueryOrFilter,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        additionalProperties: false,
        properties: {
          filters: {
            type: 'array',
          },
          kind: {
            const: 'or',
            type: 'string',
          },
        },
        required: ['filters', 'kind'],
        type: 'object',
      },
      {
        $id: JsonSchemaId.cardFindQueryRangeFilter,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        additionalProperties: false,
        properties: {
          kind: {
            const: 'range',
            type: 'string',
          },
          max: {
            properties: {
              exclude: {
                type: 'boolean',
              },
              value: {},
            },
            required: ['exclude', 'value'],
            type: 'object',
          },
          min: {
            properties: {
              exclude: {
                type: 'boolean',
              },
              value: {},
            },
            required: ['exclude', 'value'],
            type: 'object',
          },
        },
        required: ['kind', 'max', 'min'],
        type: 'object',
      },
      {
        $id: JsonSchemaId.cardFindQueryTextFilter,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        additionalProperties: false,
        properties: {
          kind: {
            const: 'text',
            type: 'string',
          },
          value: {},
        },
        required: ['kind', 'value'],
        type: 'object',
      },
      {
        $id: JsonSchemaId.cardFindQueryValueFilter,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        additionalProperties: false,
        properties: {
          kind: {
            const: 'value',
            type: 'string',
          },
          value: {},
        },
        required: ['kind', 'value'],
        type: 'object',
      },
      {
        $id: JsonSchemaId.cardFindStringEnumQueryFilter,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        anyOf: [
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryAndFilter },
              {
                properties: {
                  filters: {
                    items: {
                      $ref: JsonSchemaId.cardFindStringEnumQueryFilter,
                    },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            ],
          },
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryListFilter },
              {
                properties: {
                  values: {
                    items: {
                      type: 'string',
                    },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            ],
          },
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryOrFilter },
              {
                properties: {
                  filters: {
                    items: {
                      $ref: JsonSchemaId.cardFindStringEnumQueryFilter,
                    },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            ],
          },
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryValueFilter },
              {
                properties: {
                  value: {
                    type: 'string',
                  },
                },
                type: 'object',
              },
            ],
          },
        ],
      },
      {
        $id: JsonSchemaId.cardFindOptionalStringEnumQueryFilter,
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        anyOf: [
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryAndFilter },
              {
                properties: {
                  filters: {
                    items: {
                      $ref: JsonSchemaId.cardFindOptionalStringEnumQueryFilter,
                    },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            ],
          },
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryListFilter },
              {
                properties: {
                  values: {
                    items: {
                      type: 'string',
                    },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            ],
          },
          { $ref: JsonSchemaId.cardFindQueryNullFilter },
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryOrFilter },
              {
                properties: {
                  filters: {
                    items: {
                      $ref: JsonSchemaId.cardFindOptionalStringEnumQueryFilter,
                    },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            ],
          },
          {
            allOf: [
              { $ref: JsonSchemaId.cardFindQueryValueFilter },
              {
                properties: {
                  value: {
                    type: 'string',
                  },
                },
                type: 'object',
              },
            ],
          },
        ],
      },
    ];

    this.#validateJsonSchemas(jsonSchemas);

    this.#registerInitializeCall();

    this.#initializeValidatorMap(jsonSchemas);
  }

  #buildValidator(ajvValidateFn: ValidateFunction): Validator<unknown> {
    const validator: Validator<unknown> = {
      validate: (data: unknown): data is unknown => {
        const validationResult: boolean = ajvValidateFn(data);

        if (validationResult) {
          validator.errors = null;
        } else {
          validator.errors = (ajvValidateFn.errors ?? [])
            .map((errorObject: ErrorObject) => errorObject.message ?? '')
            .join('\n');
        }

        return validationResult;
      },
    };

    return validator;
  }

  #initializeValidatorMap(jsonSchemaObjects: SchemaObject[]): void {
    for (const jsonSchema of jsonSchemaObjects) {
      const jsonSchemaId: string = jsonSchema.$id as string;
      this.#ajvInstance.addSchema(jsonSchema, jsonSchemaId);
    }

    for (const jsonSchema of jsonSchemaObjects) {
      const ajvValidateFn: ValidateFunction =
        this.#ajvInstance.compile(jsonSchema);

      const validator: Validator<unknown> = this.#buildValidator(ajvValidateFn);
      const jsonSchemaId: string = jsonSchema.$id as string;

      this.#idToValidatorMap.set(jsonSchemaId, validator);
    }
  }

  #registerInitializeCall(): void {
    if (this.#initializeIsCalled) {
      throw new Error('Initialize was already called!');
    } else {
      this.#initializeIsCalled = true;
    }
  }

  #throwOnNonJsonSchemaWith$Id(jsonSchema: SchemaObject): void {
    if (typeof jsonSchema === 'boolean') {
      throw new Error(`Unexpected boolean JsonSchema`);
    }

    if (jsonSchema.$id === undefined) {
      throw new Error(
        `Unexpected JsonSchema object without $id.

${JSON.stringify(jsonSchema)}`,
      );
    }
  }

  #validateJsonSchemas(
    jsonSchemas: SchemaObject[],
  ): asserts jsonSchemas is SchemaObject[] {
    for (const jsonSchema of jsonSchemas) {
      this.#throwOnNonJsonSchemaWith$Id(jsonSchema);
    }
  }
}
