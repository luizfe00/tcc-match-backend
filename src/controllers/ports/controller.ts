import { HttpRequest } from './http-request';
import { HttpResponse } from './http-response';

export interface Controller {
  handle(HttpRequest: HttpRequest): Promise<HttpResponse>;
}
