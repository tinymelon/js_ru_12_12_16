import React, { Component, PropTypes } from 'react'
import {translator} from '../helpers'

class Loader extends Component {
    static contextTypes = {
        language: PropTypes.string
    }

    render() {
        return (<div>
            <h2>{translator(this.context.language, 'Loading')}...</h2>
        </div>)
    }
}

export default Loader