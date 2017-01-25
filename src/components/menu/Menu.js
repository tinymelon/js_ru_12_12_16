import React, { Component, PropTypes } from 'react'
import {translator} from '../../helpers'

class Menu extends Component {
    static propTypes = {

    };

    static contextTypes = {
        language: PropTypes.string
    }

    render() {
        return (
            <div>
                <h3>{translator(this.context.language, 'Select path')}</h3>
                <ul>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

export default Menu