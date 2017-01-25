import React, { Component, PropTypes } from 'react'
import store from '../store'
import { Provider } from 'react-redux'
import Menu from '../components/menu/Menu'
import MenuItem from '../components/menu/MenuItem'
import {translator} from '../helpers'

class App extends Component {
    static propTypes = {

    };

    static contextTypes = {
        router: PropTypes.object
    }

    state = {
        username: '',
        language: this.context.router.location.pathname.indexOf('ru') >= 0 ? 'ru' : 'en'
    }

    static childContextTypes = {
        user: PropTypes.string,
        language: PropTypes.string
    }

    getChildContext() {
        return {
            user: this.state.username,
            language: this.state.language
        }
    }

    render() {
        console.log('---', 'App')
        return (
            <Provider store = {store}>
                <div>
                    <h1>{translator(this.state.language, 'News App')}</h1>
                    <div><a href={`/${this.state.language == 'ru' ? 'en' : 'ru'}/`}>{translator(this.state.language, 'Switch to another language')}</a><br/><br/><br/></div>
                    <div>
                        {translator(this.state.language, 'Input username')}:
                        <input type="text" value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <Menu>
                        <MenuItem path={`/${this.state.language}/counter`}/>
                        <MenuItem path={`/${this.state.language}/articles`}/>
                        <MenuItem path={`/${this.state.language}/filters`}/>
                    </Menu>
                    {this.props.children}
                </div>
            </Provider>
        )
    }

    handleChange = ev => {
        this.setState({
            username: ev.target.value
        })
    }
}

export default App