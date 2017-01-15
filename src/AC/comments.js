import { ADD_COMMENT } from '../constants'

export function add_comment(comment, articleId) {
    return {
        type: ADD_COMMENT,
        payload: { articleId, comment },
        getRandomId: true
    }
}