export interface UseCase {
  perform(request?: any, token?: string): Promise<any>;
}
