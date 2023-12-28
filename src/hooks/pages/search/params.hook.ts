import { useMemo } from 'react';
import { FacetParam, StringParam } from '../../../utils/params';
import { QueryParams } from '../../../@types/params/query-params';

import { useGenericParams } from './../../common';
import { Search } from '../../../@types/search';

const template: QueryParams.Template<Search.IParams> = {
	search: new StringParam(),
	authors: new FacetParam(),
	journals: new FacetParam(),
	languages: new FacetParam(),
	sortBy: new StringParam()
};

const useParams = () => {
	const [params, setParams] = useGenericParams<Search.IParams>(template);

	const enrichedParams = useMemo<Search.IParams>(() => {
		return {
			...params,
			sortBy: params.sortBy || 'RELEVANCE_SCORE'
		};
	}, [params]);

	return [enrichedParams, setParams] as [typeof enrichedParams, typeof setParams];
};

export default useParams;