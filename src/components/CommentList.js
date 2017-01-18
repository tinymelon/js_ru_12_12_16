import React, { Component, PropTypes } from 'react'
import {addComment, loadCommentsByArticle} from '../AC'
import Comment from './Comment'
import Loader from './Loader'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import {connect} from 'react-redux'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) nextProps.loadCommentsByArticle(nextProps.article.id)
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {this.getLink()}
                {this.getBody()}
            </div>
        )
    }

    getLink() {
        return <a href="#" onClick = {this.props.toggleOpen}>
            {this.props.isOpen ? 'hide' : 'show'} comments
        </a>
    }

    getBody() {
        const { comments, article, isOpen, addComment, loading } = this.props
        if (!isOpen) return null
        const form = <NewCommentForm addComment={(comment) => addComment(article.id, comment)} />
        if (!comments.length) return <div><p>No comments yet</p>{form}</div>
        //Полагаю, решение с кучей условий не особо верное, но как-то у меня не появилось идей, как еще это можно сделать
        //не то, чтобы не верное, просто не красивое. мог бы сразу Loader вернуть и дальше не писать if/else 
        if (!loading) {
            var commentItems = comments.map(comment => {
                if (comment) return <li key={comment.id}><Comment comment={comment}/></li>
                else return null
            })
            var loader = false;
        } else {
            var loader = <Loader />
            var commentItems = false;
        }
        return (
            <div>
                {loader}
                <ul>{commentItems}</ul>
                {form}
            </div>
        )
    }
}

export default connect((storeState, props) => {
    var comments_js = storeState.comments.entities.toJS()
    return {
        //comments: props.article.comments.map(id => comments_js[id]),
        comments: props.article.comments.map(id => storeState.comments.getIn(['entities', id])),
        loading: storeState.comments.loading
    }
}, { addComment, loadCommentsByArticle })(toggleOpen(CommentList))
