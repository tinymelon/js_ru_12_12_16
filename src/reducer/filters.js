import { SET_LABELS, SET_DATE } from '../constants'

export default (filtersState = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_LABELS:
            return {
                labels: payload.labels,
                date: filtersState.date
            }
        case SET_DATE:
            return {
                date: {
                    startDate: payload.date.from,
                    endDate: payload.date.to
                },
                labels: filtersState.labels
            }
    }

    return filtersState
}