import { QueryParams } from "../../@types/params/query-params";

class ArrayOf<T> extends QueryParams.ArrayParam<T> {
	private param: QueryParams.Param<T>;

	constructor(param: QueryParams.Param<T>) {
		super();
		this.param = param;
	}

	encode(value: T[]): string[] {
		return value
			.map(item => this.param.encode(item))
			.filter(item => typeof item !== 'undefined') as string[];
	};

	decode(value: string[]): T[] {
		return value.map(item => this.param.decode(item));
	}
}

export default ArrayOf;