import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import { setFiltersLabel } from '../AC'
import { connect } from 'react-redux'
import 'react-select/dist/react-select.css'

class ArticlesSelect extends Component {
    static propTypes = {
        articles: PropTypes.array
    };

    state = {
        selected: null
    }

    render() {
        const options = this.props.articles.map(article => ({
            label: article.title,
            value: article.id
        }))
        return (
            <div>
                <Select options={options} value={this.state.selected} onChange={this.handleChange} multi={true}/>
            </div>
        )
    }

    handleChange = selected => {
        this.setState({
            selected
        })
        this.props.setFiltersLabel(selected)
    }
}


export default connect((state) => {
    return {
        articles: state.articles
    }
}, { setFiltersLabel })(ArticlesSelect)