import React, {PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
import Loader from './Loader'
import accordion from '../decorators/accordion'
import { connect } from 'react-redux'
import { mapToArray } from '../helpers'
import { loadAllArticles } from '../AC'
import {translator} from '../helpers'

class ArticleList extends React.Component {
    componentDidMount() {
        this.props.loadAllArticles()
    }

    static contextTypes = {
        language: PropTypes.string
    }

    render() {
        const {articles, loading, isOpenItem, toggleOpenItem} = this.props
        const articleElements = articles.map(article =>
            <li key={article.id}>
                <Link to={`/${this.context.language}/articles/${article.id}`} activeStyle={{color: 'red'}}>{article.title}</Link>
            </li>)
        const loader = loading && <Loader />
        return (
            <div>
                <h2>{translator(this.context.language, 'Article list')}</h2>
                <ul>
                    {/*some comment*/}
                    {articleElements}
                </ul>
                {loader}
            </div>
        )
    }

    getArticleRef = (article) => {
        this.article = article
    }
}

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    isOpenItem: PropTypes.func.isRequired,
    toggleOpenItem: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        const articles = mapToArray(state.articles.entities)
        const { filters } = state
        const {selected} = filters
        const { from, to } = filters.dateRange

        const filteredArticles = articles.filter(article => {
            const published = Date.parse(article.date)
            return (!selected.length || selected.includes(article.id)) &&
                (!from || !to || (published > from && published < to))
        })
        return {
            articles: filteredArticles,
            loading: state.articles.loading
        }
    },
    { loadAllArticles }, null, {pure: false}
)(accordion(ArticleList))