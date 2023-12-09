import classes from './search.module.sass';

import { Layout } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import ArticlesList from '../../components/page-components/search/articles-list/articles-list.component';
import { Filters } from '../../components/page-components/search';
import { useSearch } from '../../hooks/pages/search';

function SearchPage() {
	const search = useSearch();
	return (
		<Layout className={classes.layout}>
			<Header
				className={classes.header}
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 1,
					width: '100%',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<h1>Pubmed Search Application using Elasticsearch and NodeJS</h1>
			</Header>
			<div className={classes.container}>
				<div className={classes.left}>
					<Filters facets={search.facets} />
				</div>
				<div className={classes.right}>
					<Content>
						<ArticlesList hasMore={search.hasMore} next={() => search.retrieve()} result={search.result || []} total={search.total} />
					</Content>
				</div >
			</div>
		</Layout>
	);
}

export default SearchPage;
