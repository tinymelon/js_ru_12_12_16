import React, {PropTypes} from 'react'
import Article from './Article'
import toggleOpenArticle from '../decorators/toggleOpenArticle'

class ArticleList extends React.Component {
    static defaultProps = {
        articles: []
    }
    static propTypes = {
        articles: PropTypes.array.isRequired
    }

    render() {
        const {articles} = this.props
        const articleElements = articles.map(article =>
            <li key={article.id}>
                <Article article={article}
                         isOpen={this.props.openArticleId == article.id && this.props.openArticleId != this.props.prevOpenedArticle}
                         onClick={() => this.props.toggleOpenArticle(article.id)}
                />
            </li>)
        return (
            <div>
                <h2>Article List</h2>
                <ul>
                    {/*some comment*/}
                    {articleElements}
                </ul>
            </div>
        )
    }
}

export default toggleOpenArticle(ArticleList)