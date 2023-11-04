export interface ITinaResponse<T, V> {
  data: T;
  errors?:
    | {
        message: string;
        locations: {
          line: number;
          column: number;
        }[];
        path: string[];
      }[]
    | undefined;
  variables: V;
  query: string;
}
