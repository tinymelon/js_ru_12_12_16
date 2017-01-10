import { INCREMENT, DELETE_ARTICLE, SET_LABELS, SET_DATE } from '../constants'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function setFiltersLabel(labels) {
    return {
        type: SET_LABELS,
        payload: { labels }
    }
}

export function setFiltersDate(date) {
    return {
        type: SET_DATE,
        payload: { date }
    }
}