import { ADD_COMMENT, LOAD_COMMENTS, SUCCESS, START } from '../constants'
import { arrayToMap } from '../helpers'
import { Record, OrderedMap } from 'immutable'

const CommentModel = Record({
    id: null,
    text: null,
    user: null
})

const DefaultReducerState = Record({
    error: null,
    loading: false,
    loaded: false,
    entities: new OrderedMap({})
})

export default (state = new DefaultReducerState({}), action) => {
    const { type, payload, randomId, response } = action

    switch (type) {
        case ADD_COMMENT:
            return state.setIn(['entities'], randomId, new CommentModel({...payload.comment, id: randomId}))

        case LOAD_COMMENTS + START:
            return state.set('loading', true)

        case LOAD_COMMENTS + SUCCESS:
            return state.mergeIn(['entities'], arrayToMap(response, CommentModel))
                .set('loading', false)
                .set('loaded', true)
    }

    return state
}