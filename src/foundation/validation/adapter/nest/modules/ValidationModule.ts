import { Module } from '@nestjs/common';

import { AjvJsonSchemaValidatorProvider } from '../../ajv/services/AjvJsonSchemaValidatorProvider';

@Module({
  exports: [AjvJsonSchemaValidatorProvider],
  providers: [
    {
      provide: AjvJsonSchemaValidatorProvider,
      useFactory: async () => {
        const apiJsonSchemasValidationProvider: AjvJsonSchemaValidatorProvider =
          new AjvJsonSchemaValidatorProvider();

        await apiJsonSchemasValidationProvider.initialize();

        return apiJsonSchemasValidationProvider;
      },
    },
  ],
})
export class ValidationModule {}
