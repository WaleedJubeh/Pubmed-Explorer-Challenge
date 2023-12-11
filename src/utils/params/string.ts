import { QueryParams } from "../../@types/params/query-params";

class StringParam<T extends string> extends QueryParams.Param<T> {
  encode(value: T): string | undefined {
    return value || undefined;
  }

  decode(value: string): T {
    return value as T;
  }
}

export default StringParam;