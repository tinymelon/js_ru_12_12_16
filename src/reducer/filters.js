import { SET_LABELS, SET_DATE } from '../constants'

export default (filtersState = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_LABELS:
            //лучше используй Objrct.assign, иначе замучаешься добавлять фильтры
            return {
                //почему labels, а не ids?
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
