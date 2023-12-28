import { useEffect, useState } from 'react';
import { QueryParams } from '../../../../@types/params/query-params';
import { Search as SearchNS } from '../../../../@types/search';
import classes from './filters.module.sass';

import { useDebounce } from "@uidotdev/usehooks";

import { Select, Input } from 'antd';
import Facet from './facet/facet.component';

const { Search } = Input;

interface IProps {
	facets: SearchNS.IFacets | null;
	params: SearchNS.IParams;
	setParams: QueryParams.Function<SearchNS.IParams>;
}

const Filters = (props: IProps) => {
	const [searchTerm, setSearchTerm] = useState<string>(props.params.search);
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	useEffect(() => {
		props.setParams({ search: debouncedSearchTerm });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm]);

	return (
		<div>
			<Search
				title="Full search text, search using any word"
				style={{ marginBottom: 20 }}
				placeholder="Full search text, search using any word"
				allowClear
				enterButton="Search"
				size="middle"
				value={searchTerm || ''}
				onChange={(event) => setSearchTerm(event.target.value)}
			/>
			<div className={classes.row}>
				<Facet
					label="Select Journal/s"
					placeholder="Select Journal/s"
					options={props.facets?.journals}
					facet={props.params.journals}
					onChange={(values) => props.setParams({ journals: { ...props.params.journals, value: values, operator: 'OR' } })}
					onInput={(search) => props.setParams({ journals: { ...props.params.journals, typeAhead: search } })}
				/>
				<Facet
					label="Select Language/s"
					placeholder="Select Language/s"
					options={props.facets?.languages}
					facet={props.params.languages}
					onChange={(values) => props.setParams({ languages: { ...props.params.languages, value: values, operator: 'OR' } })}
				/>
			</div>
			<div className={classes.row}>
				<Facet
					label="Select Author/s"
					placeholder="Select Author/s"
					options={props.facets?.authors}
					facet={props.params.authors}
					onChange={(values) => props.setParams({ authors: { ...props.params.authors, value: values, operator: 'AND' } })}
					onInput={(search) => props.setParams({ authors: { ...props.params.authors, typeAhead: search } })}
				/>
				<div className={classes.row}>
					<label style={{ marginInlineEnd: 20 }}>Sort By</label>
					<Select
						title='Sort by'
						style={{ width: 270 }}
						options={[{ value: 'RELEVANCE_SCORE', label: 'Relevance score' }, { value: 'DATE', label: 'Date' }]}
						value={props.params.sortType}
						onChange={(value) => props.setParams({ sortType: value })}
					/>
				</div>
			</div>
		</div>
	);
};

export default Filters; 