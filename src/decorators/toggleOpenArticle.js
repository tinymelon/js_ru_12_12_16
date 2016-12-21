//decorator === HOC(Higher Order Component)
import React from 'react'

export default function toggleOpenArticle(Component) {
    return class WrapperComponent extends React.Component {
        state = {
            //суть декораторов в переисползовании кода, не привязывайся к названиям сущностей. Лучше openItemId
            openArticleId: null,
            //не понял зачем это тебе нужно
            prevOpenedArticle: null
        }
        render() {
            return <Component {...this.props} {...this.state} toggleOpenArticle = {this.toggleOpenArticle}/>
        }

        toggleOpenArticle = (id) => {
            //тебе не нужно prevOpenedArticle - хватит openArticleId != id
            if (this.state.prevOpenedArticle != id)
                this.setState({
                    prevOpenedArticle: this.state.openArticleId
                })
            else
                this.setState({
                    prevOpenedArticle: null
                })
            this.setState({
                openArticleId: id
            })
        }

    }
}
