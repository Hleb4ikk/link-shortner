export type ApiData<T> =
  | { successFetch: true; fetchData: T }
  | { successFetch: false; message: string };
