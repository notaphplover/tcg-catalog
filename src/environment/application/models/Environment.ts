import { URL } from 'node:url';

export interface Environment {
  corsOrigins: string[];
  host: string;
  mongoDbConnectionUrl: URL;
  mongoDbName: string;
  port: number;
}
