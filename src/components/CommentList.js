import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import { add_comment } from '../AC/comments'
import NewCommentForm from './NewCommentForm'
import {connect} from 'react-redux'

class CommentList extends Component {
    static propTypes = {
        commentsIds: PropTypes.array,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    render() {
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
        const { isOpen, article, comments, add_comment } = this.props
        if (!isOpen) return null
        const form = <NewCommentForm articleId = {article.id} add_comment = {add_comment}/>
        if (!comments.length) return <div><p>No comments yet</p>{form}</div>
        
        const commentItems = comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)
        return (
            <div>
                <ul>{commentItems}</ul>
                {form}
            </div>
        )
    }
}

export default connect((storeState, props) => {
    return {
        comments: props.article.comments.map(id => storeState.comments.get(id))
    }
}, { add_comment })(toggleOpen(CommentList))

