import { Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Search } from '../../../../@types/search';
import Article from '../article/article.component';

interface IProps {
	total: number;
	result: Search.IArticle[];
	hasMore: boolean;
	next: () => any;
}

const ArticlesList = (props: IProps) => {
	return (
		<InfiniteScroll
			dataLength={props.result.length}
			next={props.next}
			hasMore={true}
			loader={<Skeleton paragraph={{ rows: 3 }} title={true} active />}
		>
			{props.result.map(article => <Article key={article.id} article={article} />)}
		</InfiniteScroll>
	);
};

export default ArticlesList;