/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Search } from '../../../@types/search';
import searchService from '../../../services/search.service';

interface IState {
	loading: boolean;
	hasMore: boolean;
	result: Search.IArticle[] | null;
	facets: Search.IFacets | null;
	total: number;
	page: number;
	pageSize: number;
	init: boolean;
}
const getInitialState = (): IState => ({
	total: 0,
	page: 1,
	pageSize: 20,
	hasMore: true,
	loading: false,
	facets: null,
	result: null,
	init: false
});

const useSearch = (params: Partial<Search.IParams>) => {
	const [state, setState] = useState<IState>(getInitialState());

	const retrieve = (next?: boolean) => {
		if (next) {
			if (!state.hasMore) {
				return;
			}

			setState({
				...state,
				loading: true,
				init: true
			});
		} else {
			setState({
				...state,
				init: false
			});
		}

		if (state.loading) {
			return;
		}

		const nextPage = next ? state.page : 1;
		const searchPayload: Search.ISearchPayload = {
			page: nextPage,
			pageSize: state.pageSize,
			search: params.search,
			facets: {
				authors: params.authors,
				journals: params.journals,
				languages: params.languages
			}
		};
		searchService.search(searchPayload).then(searchResult => {
			const finalResult = nextPage === 1 ? searchResult.result : (state.result || []).concat(searchResult.result);
			const hasMore = searchResult.total > finalResult.length;
			setState({
				...state,
				page: nextPage + 1,
				pageSize: searchResult.pageSize,
				facets: searchResult.facets,
				result: finalResult,
				loading: false,
				total: searchResult.total,
				hasMore,
				init: true
			});
		}).catch(error => {
			console.error(error);
			setState({ ...state, init: true });
		});
	};

	useEffect(() => retrieve(), [params]);
	return { ...state, retrieve };
};

export default useSearch;