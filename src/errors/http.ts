class HttpError extends Error {
	readonly status: number;
	readonly res: Response;
	constructor(message: string, res: Response) {
		super(`${res.status} - ${message}`);
		this.status = res.status;
		this.res = res;
	}
}

const throwHttpError = async function (res: Response): Promise<Response> {
	if (res.status >= 400 && res.status < 500) {
		throw new HttpError('HTTP Client Error', res);
	}

	if (res.status >= 500 && res.status < 600) {
		throw new HttpError('HTTP Server Error', res);
	}

	return res;
};

export default {
	HttpError,
	throwHttpError
};