import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';
import { cleanEnv, host, json, port, str, url } from 'envalid';

import { DotEnvLoader } from '../../adapter/dotenv/services/DotEnvLoader';
import { Environment } from '../models/Environment';
import { EnvironmentRaw } from '../models/EnvironmentRaw';

const DEFAULT_DOT_ENV_PATH: string = '.env';
const DOT_ENV_PATH_ENV_VAR: string = 'TGC_CATALOG_SERVICE_DOT_ENV_PATH';
const DOT_ENV_ENABLED_ENV_VAR: string = 'TGC_CATALOG_SERVICE_DOT_ENV_ENABLED';

@Injectable()
export class EnvironmentLoader extends DotEnvLoader<Environment> {
  public static build(): EnvironmentLoader {
    const dotEnvPath: string =
      process.env[DOT_ENV_PATH_ENV_VAR] ?? DEFAULT_DOT_ENV_PATH;

    const environmentLoader: EnvironmentLoader = new EnvironmentLoader(
      dotEnvPath,
    );

    return environmentLoader;
  }

  protected _parseEnv(env: Record<string, string>): Environment {
    const rawEnvironment: EnvironmentRaw = cleanEnv(env, {
      TGC_CATALOG_SERVICE_CORS_ORIGINS: json(),
      TGC_CATALOG_SERVICE_HOST: host(),
      TGC_CATALOG_SERVICE_MONGODB_CONNECTION_URL: url(),
      TGC_CATALOG_SERVICE_MONGODB_NAME: str(),
      TGC_CATALOG_SERVICE_PORT: port(),
    });

    return {
      corsOrigins: rawEnvironment.TGC_CATALOG_SERVICE_CORS_ORIGINS,
      host: rawEnvironment.TGC_CATALOG_SERVICE_HOST,
      mongoDbConnectionUrl: new URL(
        rawEnvironment.TGC_CATALOG_SERVICE_MONGODB_CONNECTION_URL,
      ),
      mongoDbName: rawEnvironment.TGC_CATALOG_SERVICE_MONGODB_NAME,
      port: rawEnvironment.TGC_CATALOG_SERVICE_PORT,
    };
  }

  protected override _shouldParseEnvFile(): boolean {
    return process.env[DOT_ENV_ENABLED_ENV_VAR] !== 'false';
  }
}
