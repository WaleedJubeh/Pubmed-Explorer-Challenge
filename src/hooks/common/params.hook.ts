/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QueryParams } from '../../@types/params/query-params';

interface IConfig {
	/**
	 * Replace existing history entry or push a new one.
	 * @default 'replace'
	 */
	mode: 'replace' | 'push';
}

const useParams = <P extends object>(template: QueryParams.Template<P>, config?: Partial<IConfig>) => {
	const location = useLocation();
	const navigate = useNavigate();

	const afterHash = location.hash.slice(1);
	const pathname = location.pathname || '';
	const queryString = location.search.slice(1) || '';
	const triggerRef = useRef<QueryParams.ITrigger | undefined>();

	// User is not allowed to update the template.
	template = useMemo(() => template, []);

	const urlParams = useMemo(() => new URLSearchParams(queryString), [queryString]);

	/**
	 * Query String parameter setter function.
	 */
	const setParams = useCallback<QueryParams.Function<P>>((params, extras) => {
		const mode = extras?.mode ?? config?.mode ?? 'replace';
		const newUrlParams = new URLSearchParams(urlParams);

		triggerRef.current = extras?.trigger;

		Object.entries(params).forEach(([key, value]) => {
			if (template[key as keyof P]) {
				const param = template[key as keyof P];

				if (value === undefined || value === null) {
					// `undefined` and `null` could be passed intentional as an instruction to remove parameter from URL.
					newUrlParams.delete(key);
				} else if (param instanceof QueryParams.ArrayParam) {
					newUrlParams.delete(key);

					if (value !== undefined && value !== null) {
						const encoded = param.encode(value as []);

						encoded.forEach(item => newUrlParams.append(key, item));
					}
				} else {
					const encoded = param.encode(value as P[keyof P]);

					if (encoded === undefined || encoded === null) {
						newUrlParams.delete(key);
					} else {
						newUrlParams.set(key, encoded);
					}
				}
			}
		});

		const queryString = newUrlParams.toString();
		navigate(`${pathname}${queryString ? '?' + queryString : ''}${afterHash ? '#' + afterHash : ''}`, { replace: mode === 'replace' });

		return queryString;
	}, [config?.mode, urlParams, navigate, pathname, afterHash, template]);

	const dependencies = useMemo(() => Object.keys(template).map(key => urlParams.getAll(key).join()), [template, urlParams]);

	const [params] = useMemo(() => {
		type Template = QueryParams.Template<P>;

		const params = (Object.entries(template) as Array<[keyof Template, Template[keyof Template]]>)
			.reduce<Partial<P>>((params, [key, param]) => {
				if (param instanceof QueryParams.ArrayParam) {
					params[key] = param.decode(urlParams.getAll(key as string)) as any as P[keyof P];
				} else {
					const value = urlParams.get(key as string);

					if (value !== undefined && value !== null) {
						params[key] = param.decode(value) as any as P[keyof P];
					}
				}

				return params;
			}, {});

		return [params];
	}, dependencies);

	return [params, setParams] as [typeof params, typeof setParams];
};

export default useParams;