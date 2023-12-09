import { Search } from '../../../../@types/search';
import classes from './article.module.sass';

interface IProps {
  article: Search.IArticle;
};

const Article = (props: IProps) => {
  return (
    <div className={classes.card}>
      <div className={classes.journal}>{props.article.journalTitle}</div>
      <div className={classes.title}>{props.article.title}</div>
      <div className={classes.authors}>
        <span>By</span>
        {props.article.authors.map((authorName, index) => <span key={index}>{authorName}</span>)}
      </div>
      <div className={classes.abstract} dangerouslySetInnerHTML={{ __html: props.article.abstract }}></div>
    </div>
  )
}

export default Article;