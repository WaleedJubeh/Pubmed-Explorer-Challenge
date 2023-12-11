import { QueryParams } from "../../@types/params/query-params";

class NumberParam extends QueryParams.Param<number> {
  encode(value: number): string {
    return String(value);
  }

  decode(value: string): number {
    return Number(value);
  }
}

export default NumberParam;