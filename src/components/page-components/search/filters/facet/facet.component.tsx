import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { Search } from '../../../../../@types/search';
import { QueryParams } from '../../../../../@types/params/query-params';
import { useDebounce } from '@uidotdev/usehooks';

interface IProps {
	facet: QueryParams.Facet.IValue;
	options: Search.IFacetsOption[];
	onChange: (value: string[], option: Search.IFacetsOption | Search.IFacetsOption[]) => void;
	label?: string;
	placeholder?: string;
	onInput?: (search: string) => void;
}

const Facet = (props: IProps) => {
	const [typeAhead, setTypeAhead] = useState<string>(props.facet?.typeAhead || '');
	const typeAheadDebounced = useDebounce(typeAhead, 300);

	useEffect(() => {
			props.onInput instanceof Function && props.onInput(typeAheadDebounced);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [typeAheadDebounced]);
	return (
		<>
			{props.label && <label style={{ marginInlineEnd: 20 }}>{props.label}</label>}
			<Select
				title={props.label}
				mode="multiple"
				placeholder={props.placeholder}
				style={{ width: 270 }}
				options={props.options || []}
				value={props.facet?.value || []}
				onChange={props.onChange}
				onSearch={(search) => setTypeAhead(search)}
				searchValue={typeAhead}
			/>
		</>
	);
};

export default Facet;