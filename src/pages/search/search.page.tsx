import classes from './search.module.sass';

import { Spin, Layout } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import ArticlesList from '../../components/page-components/search/articles-list/articles-list.component';
import { Filters } from '../../components/page-components/search';

import { useSearch } from '../../hooks/pages/search';
import useParams from '../../hooks/pages/search/params.hook';

function SearchPage() {
	const [params, setParams] = useParams();
	const search = useSearch(params);

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
					<Filters
						facets={search.facets}
						params={params}
						setParams={setParams}
					/>
				</div>
				<div className={classes.right}>
					<Content>
						{
							search.init
								? (
									<ArticlesList
										hasMore={search.hasMore}
										next={() => search.retrieve(true)}
										result={search.result || []}
										total={search.total} />
								)
								: (<Spin size="large" />)
						}
					</Content>
				</div >
			</div>
		</Layout>
	);
}

export default SearchPage;
