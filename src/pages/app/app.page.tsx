import classes from './app.module.sass';

import { Layout, Select, Input } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';

const { Search } = Input;

function App() {
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
        <Content className={classes.form} style={{ padding: '50px 50px' }}>
          <Search
            title="Full search text, search using any word"
            style={{ marginBottom: 20 }}
            placeholder="Full search text, search using any word"
            allowClear
            enterButton="Search"
            size="middle"
          />
          <div className={classes.row} data-size="6">
            <Select
              title="Select Journal/s"
              mode="multiple"
              placeholder="Select Journal/s"
              style={{ width: '100%' }}
              options={[{ label: '1', value: 1 }]}
            />
            <Select
              title="Select Language/s"
              mode="multiple"
              placeholder="Select Language/s"
              style={{ width: '100%' }}
              options={[{ label: '1', value: 1 }]}
            />
          </div>
          <div className={classes.row} data-size="6">
            <Select
              title='Select Author/s'
              mode="multiple"
              placeholder="Select Author/s"
              style={{ width: '100%' }}
              options={[{ label: '1', value: 1 }]}
            />
            <div>
              <label style={{marginInlineEnd: 20}}>Sort By</label>
              <Select
                title='Sort by'
                defaultValue="relevance_score"
                style={{ width: 255 }}
                options={[{ value: 'relevance_score', label: 'Relevance score' }, { value: 'date', label: 'Date' }]}
              />
            </div>
          </div>
        </Content>
      </div >
    </Layout >
  );
}

export default App;
