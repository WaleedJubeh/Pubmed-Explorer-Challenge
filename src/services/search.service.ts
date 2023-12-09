import { Search } from '../@types/search';
import { throwHttpError } from './../errors';

class SearchService {
	API: string;

	constructor() {
		this.API = process.env.REACT_APP_SEARCH_API as string;
	}
	async search(payload: Search.ISearchPayload) {
		const options: RequestInit = {
			method: 'GET'
		};

		return fetch(`${this.API}/api/articles/search?page=${payload.page}&pageSize=${payload.pageSize}`, options)
			.then(throwHttpError)
			.then(response => response.json() as unknown as Search.IResponse);
	}
}

const searchService = new SearchService();

export default searchService;