interface BackendSuccessResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors: null;
}

interface BackendErrorResponse<T> {
  error: T;
  success: boolean;
  message: string;
}

interface BackendPaginatedSuccessResponse<T> {
  data: T,
  recordsFiltered: number,
  primaryColumns?: [],
  recordsTotal: number,
  tableColumns?: { columnKey: string, displayName: string, displayNameLocal: string }[],
  draw: number
}

interface SaveSuccessResponse {
  data: null;
  status: boolean;
  message: string;
}

interface GenericObj<Value = string> {
  [key: string]: Value;
}

type OneOf<Obj, Key extends keyof Obj> = {
  [key in Exclude<keyof Obj, Key>]: null;
} & Pick<Obj, Key>;

type ValPrimitive = string | number | boolean;

type ValueOf<Obj> = (
  Obj extends object
  ? {
    [K in keyof Obj]: Obj[K] extends object ? ValueOf<Obj[K]> : Obj[K];
  }[keyof Obj]
  : ""
) extends infer Val
  ? Val
  : never;

type AddValue<Obj extends object, Value> = { [key in keyof Obj]: Obj[key] | Value };

// eslint-disable-next-line
type SelectedPartial<T, K extends keyof any> = Omit<T, K> & Partial<Pick<T, K>>;

type RecursiveKeyOf<T> = T extends object
  ? {
    [K in keyof T]: RecursiveKeys<T[K]>;
  }[keyof T]
  : T;

type WithoutIndexSignature<T> = {
  [K in keyof T as string extends K ? never : K]: T[K];
};