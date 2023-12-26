import { useEffect, useState } from 'react';
import { QueryParams } from '../../../../@types/params/query-params';
import { Search as SearchNS } from '../../../../@types/search';
import classes from './filters.module.sass';

import { useDebounce } from "@uidotdev/usehooks";

import { Select, Input } from 'antd';

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
				<label style={{ marginInlineEnd: 20 }}>Select Journal/s</label>
				<Select
					title="Select Journal/s"
					mode="multiple"
					placeholder="Select Journal/s"
					style={{ width: 270 }}
					options={props.facets?.journals || []}
					value={props.params.journals?.value || []}
					onChange={(values) => props.setParams({ journals: { operator: 'OR', value: values } })}
				/>
				<label style={{ marginInlineEnd: 20 }}>Select Language/s</label>
				<Select
					title="Select Language/s"
					mode="multiple"
					placeholder="Select Language/s"
					style={{ width: 270 }}
					options={props.facets?.languages || []}
					value={props.params.languages?.value || []}
					onChange={(values) => props.setParams({ languages: { operator: 'OR', value: values } })}
				/>
			</div>
			<div className={classes.row}>
				<label style={{ marginInlineEnd: 20 }}>Select Author/s</label>
				<Select
					title='Select Author/s'
					mode="multiple"
					placeholder="Select Author/s"
					style={{ width: 270 }}
					options={props.facets?.authors || []}
					value={props.params.authors?.value || []}
					onChange={(values) => props.setParams({ authors: { operator: 'AND', value: values } })}

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