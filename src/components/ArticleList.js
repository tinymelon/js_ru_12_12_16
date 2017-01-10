import React, {PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import Article from './Article'
import accordion from '../decorators/accordion'
import { connect } from 'react-redux'
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

class ArticleList extends React.Component {
    render() {
        const {articles, filters, isOpenItem, toggleOpenItem} = this.props
        var filteredArticles = articles
        if (this.props.filters.labels && this.props.filters.labels.length) {
            filteredArticles = articles.filter(article => {
                var useThis = false;
                this.props.filters.labels.forEach(function(e) {
                    if (e.label == article.title) useThis = true
                })
                return useThis
            })
        }
        console.log(this.props.filters.date)
        if (this.props.filters.date && this.props.filters.date.startDate && this.props.filters.date.endDate) {
            filteredArticles = filteredArticles.filter(article => {
                var startDate = this.props.filters.date.startDate,
                    endDate   = this.props.filters.date.endDate,
                    date  = moment(article.date),
                    range = moment().range(startDate, endDate);

                return range.contains(date);
            })
        }
        const articleElements = filteredArticles.map(article =>
            <li key={article.id}>
                <Article article={article}
                         isOpen={isOpenItem(article.id)}
                         onClick={toggleOpenItem(article.id)}
                         ref = {this.getArticleRef}
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

    getArticleRef = (article) => {
        this.article = article
        console.log('---', findDOMNode(article))
    }
}

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    isOpenItem: PropTypes.func.isRequired,
    toggleOpenItem: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            articles: state.articles,
            filters: state.filters
        }
    }
)(accordion(ArticleList))