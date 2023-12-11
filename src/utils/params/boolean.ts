import { QueryParams } from "../../@types/params/query-params";

interface IArgs {
	/**
	 * Remove parameter from URL when set to false.
	 * Note that the parameter will be undefined in next render cycle.
	 * @default false
	 */
	removeOnFalse?: boolean;
}

class BooleanParam extends QueryParams.Param<boolean | undefined> {
	constructor(private args?: IArgs) {
		super();
	}

	encode(value: boolean): string {
		if (this.args?.removeOnFalse && !value) {
			return undefined;
		}

		return value === false ? '0' : '1';
	}

	decode(value: string): boolean {
		return value === '0' ? false : true;
	}
}

export default BooleanParam;