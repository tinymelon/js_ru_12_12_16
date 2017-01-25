import React, { Component, PropTypes } from 'react'
import {translator} from '../helpers'

class NewCommentForm extends Component {
    static propTypes = {
        addComment: PropTypes.func
    }

    state = {
        text: '',
        user: ''
    }

    static contextTypes = {
        language: PropTypes.string
    }

    handleChange = field => ev => {
        this.setState({
            [field]: ev.target.value
        })
    }

    handleSubmit = ev => {
        ev.preventDefault()
        this.props.addComment(this.state)
        this.setState({
            user: '',
            text: ''
        })
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                {translator(this.context.language, 'comment')}: <input type="text" value={this.state.text} onChange = {this.handleChange('text')}/>
                {translator(this.context.language, 'user')}: <input type="text" value={this.state.user} onChange = {this.handleChange('user')}/>
                <input type = "submit"/>
            </form>
        )
    }
}

export default NewCommentForm