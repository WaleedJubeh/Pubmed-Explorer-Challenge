import { Search } from '../@types/search';
import { throwHttpError } from './../errors';

class SearchService {
	API: string;

	constructor() {
		this.API = process.env.REACT_APP_SEARCH_API as string;
	}

	async search(payload: Search.ISearchPayload) {
		const options: RequestInit = {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		// POST query to make it easier for frontend to handle complex search params.
		return fetch(`${this.API}/api/articles/search`, options)
			.then(throwHttpError)
			.then(response => response.json() as unknown as Search.IResponse);
	}
}

const searchService = new SearchService();

export default searchService;