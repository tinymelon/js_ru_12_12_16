import { ADD_COMMENT } from '../constants'
import { normalizedComments } from '../fixtures'
import { arrayToMap } from '../helpers'
import { Record } from 'immutable'

const CommentModel = Record({
    "id": null,
    "user": null,
    "text": null
})

const defaultState = arrayToMap(normalizedComments, CommentModel)

export default (commentsState = defaultState, action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case (ADD_COMMENT):
            return commentsState.set(randomId, new CommentModel({
                id: randomId,
                ...payload.comment
            }))
    }

    return commentsState
}