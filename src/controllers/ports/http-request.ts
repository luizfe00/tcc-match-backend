import { Request } from 'express';

export interface HttpRequest extends Partial<Request> {
  body: any;
  token?: string;
}
