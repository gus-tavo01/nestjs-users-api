export class HttpApiResponse<T> {
  result: T | null;
  message: string;
  statusCode: number;
  description: string;
  errors: string[];
}
