import { QueryParams } from "../../@types/params/query-params";

export default class FacetParam extends QueryParams.Param<QueryParams.Facet.IValue> {
	private cache: { key: string; value: QueryParams.Facet.IValue; };

	encode = (input: QueryParams.Facet.IValue): string => {
		return input.value?.length || input.typeAhead
			? [input.operator, input.typeAhead,input.value?.join(';')].join('::')
			: undefined;
	};

	decode = (value: string): QueryParams.Facet.IValue => {
		if (this.cache && this.cache.key === value) {
			return this.cache.value;
		}

		const [operator, typeAhead, values] = value?.split('::');

		const decoded = {
			operator: operator as QueryParams.Facet.IValue['operator'] || 'OR',
			value: values?.split(';').filter(Boolean) || [],
			typeAhead
		};

		this.cache = {
			key: value,
			value: decoded
		};

		return decoded;
	};
}