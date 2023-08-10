export type method = 'get' | 'post' | 'put' | 'delete';

export interface APIState {
  readonly url: string;
  readonly method: method;
}
