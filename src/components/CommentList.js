import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import toggleOpen from '../decorators/toggleOpen'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }
    static defaultProps = {
        comments: []
    }

    render() {
        return (
            <div>
                {this.getLink()}
                {this.getBody()}
                {this.getForm()}
            </div>
        )
    }

    getLink() {
        return <a href="#" onClick = {this.props.toggleOpen}>
            {this.props.isOpen ? 'hide' : 'show'} comments
        </a>
    }

    getBody() {
        const { comments, isOpen } = this.props
        if (!isOpen) return null
        if (!comments.length) return <p>No comments yet</p>
        const commentItems = comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)
        return <ul>{commentItems}</ul>
    }

    getForm() {
        if (!this.props.isOpen) return null
        return <AddComment />
    }
}

export default toggleOpen(CommentList)