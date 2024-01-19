export interface GetParameters {
  key: string;
}

export interface RemoveParameters {
  key: string;
}

export interface SetParameters<T> {
  key: string;
  ttlMilliseconds?: number;
  value: T;
}
