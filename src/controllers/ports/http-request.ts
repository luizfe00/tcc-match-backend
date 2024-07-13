export interface HttpRequest {
  token?: string;
  body: any;
  params?: Record<string, any>;
}
