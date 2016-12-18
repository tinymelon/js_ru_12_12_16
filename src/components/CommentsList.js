import React, { Component } from 'react'

export default class Comments extends Component {
    state = {
        isOpen: false
    }

    render() {
        if (this.props.comments)
            return this.getCommentsBody()
        else
            return null
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    getCommentsBody = () => {
        //хорошо, но старайся не использовать let, лучше const
        //в идеале Comment тоже в отдельный компонент вынести
        let text = 'Показать комментарии'
        if (this.state.isOpen) {
            text = 'Скрыть комментарии'
            const { comments } = this.props
            const commentsElements = comments.map(comment => <div key = {comment.id}><b>{comment.user}</b><div>{comment.text}</div></div>)
            return (
                <div>
                    <button onClick={this.toggleOpen}>{text}</button>
                    {commentsElements}
                </div>
            )
        } else {
            return (<button onClick={this.toggleOpen}>{text}</button>)
        }
    }
}
