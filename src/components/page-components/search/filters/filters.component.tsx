import { Search as SearchNS } from '../../../../@types/search';
import classes from './filters.module.sass';

import { Select, Input } from 'antd';

const { Search } = Input;

interface IProps {
	facets: SearchNS.IFacets | null;
}

const Filters = (props: IProps) => {
	return (
		<div>
			<Search
				title="Full search text, search using any word"
				style={{ marginBottom: 20 }}
				placeholder="Full search text, search using any word"
				allowClear
				enterButton="Search"
				size="middle"
			/>
			<div className={classes.row}>
				<label style={{ marginInlineEnd: 20 }}>Select Journal/s</label>
				<Select
					title="Select Journal/s"
					mode="multiple"
					placeholder="Select Journal/s"
					style={{ width: 270 }}
					options={props.facets?.journals || []}
				/>
				<label style={{ marginInlineEnd: 20 }}>Select Language/s</label>
				<Select
					title="Select Language/s"
					mode="multiple"
					placeholder="Select Language/s"
					style={{ width: 270 }}
					options={props.facets?.languages || []}
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
				/>
				<div className={classes.row}>
					<label style={{ marginInlineEnd: 20 }}>Sort By</label>
					<Select
						title='Sort by'
						defaultValue="relevance_score"
						style={{ width: 255 }}
						options={[{ value: 'relevance_score', label: 'Relevance score' }, { value: 'date', label: 'Date' }]}
					/>
				</div>
			</div>
		</div>
	);
};

export default Filters; 