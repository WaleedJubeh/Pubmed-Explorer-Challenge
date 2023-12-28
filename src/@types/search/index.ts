import { QueryParams } from '../params/query-params';

export namespace Search {
	export type FacetsKeys = 'languages' | 'journals' | 'authors';

	export type IFacets = {
		[key in Search.FacetsKeys]: IFacetsOption[];
	};

	export type IFacetsOption = {
		value: string;
		count: number;
	};

	export interface IResponse {
		page: number,
		pageSize: number,
		total: number,
		result: IArticle[];
		facets: IFacets;
	}

	export interface IArticle {
		id: string;
		title: string;
		journalTitle: string;
		abstract: string;
		authors: string[];
	}

	export interface ISearchPayload {
		page: number;
		pageSize: number;
		search?: string;
		facets: {
			authors?: QueryParams.Facet.IValue;
			languages?: QueryParams.Facet.IValue;
			journals?: QueryParams.Facet.IValue;
		};
	}

	export interface IParams {
		search?: string;
		authors?: QueryParams.Facet.IValue;
		languages?: QueryParams.Facet.IValue;
		journals?: QueryParams.Facet.IValue;
		sortType?: string;
	}
}