export interface ErrorV1 {
  code?: string;
  description: string;
  parameters?: {
    [k: string]: unknown;
  };
}
