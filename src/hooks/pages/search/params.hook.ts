import { useMemo } from 'react';
import { ArrayOf, StringParam } from '../../../utils/params';
import { QueryParams } from '../../../@types/params/query-params';

import { useGenericParams } from './../../common';
import { Search } from '../../../@types/search';

const template: QueryParams.Template<Search.IParams> = {
	search: new StringParam(),
	authors: new ArrayOf(new StringParam()),
	journals: new ArrayOf(new StringParam()),
	languages: new ArrayOf(new StringParam()),
	sortType: new StringParam()
};

const useParams = () => {
	const [params, setParams] = useGenericParams<Search.IParams>(template);

	const enrichedParams = useMemo<Search.IParams>(() => {
		return {
			...params,
			sortType: params.sortType || 'RELEVANCE_SCORE'
		};
	}, [params]);

	return [enrichedParams, setParams] as [typeof enrichedParams, typeof setParams];
};

export default useParams;