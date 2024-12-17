export interface EnvironmentRaw extends Record<string, unknown> {
  TGC_CATALOG_SERVICE_CORS_ORIGINS: string[];
  TGC_CATALOG_SERVICE_HOST: string;
  TGC_CATALOG_SERVICE_MONGODB_CONNECTION_URL: string;
  TGC_CATALOG_SERVICE_MONGODB_NAME: string;
  TGC_CATALOG_SERVICE_PORT: number;
}
