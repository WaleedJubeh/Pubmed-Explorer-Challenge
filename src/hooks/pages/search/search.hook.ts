import { useEffect, useState } from 'react';
import { Search } from '../../../@types/search';
import searchService from '../../../services/search.service';

interface IState {
	loading: boolean;
	page: number;
	pageSize: number;
	hasMore: boolean;
	result: Search.IArticle[] | null;
	facets: Search.IFacets | null;
	total: number,
}

const useSearch = () => {
	const [state, setState] = useState<IState>({
		page: 1,
		pageSize: 10,
		total: 0,
		hasMore: true,
		loading: false,
		facets: null,
		result: null
	});

	const retrieve = () => {
		if (state.loading) {
			return;
		}

		setState({
			...state,
			loading: true
		});

		searchService.search({ page: state.page, pageSize: state.pageSize }).then(searchResult => {
			const finalResult = (state.result || []).concat(searchResult.result);
			const hasMore = searchResult.total > finalResult.length;
			setState({
				...state,
				page: searchResult.page + 1,
				pageSize: searchResult.pageSize,
				facets: searchResult.facets,
				result: finalResult,
				loading: false,
				total: searchResult.total,
				hasMore
			});
		});
	};

	useEffect(() => retrieve(), []);
	return { ...state, retrieve };
};

export default useSearch;