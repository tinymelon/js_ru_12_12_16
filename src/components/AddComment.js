import React from 'react'

export default class AddComment extends React.Component {
    state = {
        username: '',
        comment: ''
    }
    render() {
        return (
            <form action="#" onSubmit={this.submitHandle}>
                <label>
                    Name<br />
                    <input type="text" name="name" onChange={this.handleChange(10,'username')} value={this.state.username} />
                </label>
                <br />
                <label>
                    Comment<br />
                    <textarea name="comment" cols="60" rows="5" onChange={this.handleChange(150, 'comment')} value={this.state.comment} />
                </label>
                <br />
                <button>Submit</button>
            </form>
        )
    }

    handleChange = (limit, stateName) => ev => {
        if (ev.target.value.length <= limit) {
            this.setState({
                [stateName]: ev.target.value
            })
        }
    }

    submitHandle = ev => {
        ev.preventDefault()
        if (this.state.username && this.state.comment) console.log(this.state.username, this.state.comment)
        else alert('Please enter username and comment text')
    }
}