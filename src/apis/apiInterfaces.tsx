export type method = 'get' | 'post' | 'put' | 'delete';

export interface APIState {
  readonly url: string;
  readonly method: method;
  readonly isBody?: boolean;
  readonly isPath?: boolean;
  readonly isQuery?: boolean;
}

export interface RequestBody<T> extends APIState {
  isBody: true;
  body: T;
}
