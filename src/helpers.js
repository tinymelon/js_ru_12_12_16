import { OrderedMap } from 'immutable'

export function arrayToMap(arr, Model) {
    return arr.reduce((acc,entity) => {
        const model = new Model(entity)
        return acc.set(entity.id, model)
    }, new OrderedMap({}))
}

export function mapToArray(immutableMap) {
    return immutableMap.valueSeq().toArray()
}

export function generateRandomId() {
    return Date.now() + Math.random()
}

export function translator(lang, phrase) {
    var dictionary = {
        ru: {
            'delete article': 'удалить статью',
            'Article list': 'Список статей',
            'show': 'показать',
            'hide': 'скрыть',
            'comments': 'комментарии',
            'News App': 'Новостное приложение',
            'Input username': 'Введите имя пользователя',
            'Select path': 'Выберите раздел',
            'User': 'Пользователь',
            'comment': 'комментарий',
            'user': 'пользователь',
            'No comments yet': 'Комментариев пока нет',
            'Loading': 'Загрузка'
        },
        en: {
            'Switch to another language': 'Переключиться на другой язык'
        }
    }
    return dictionary[lang] && dictionary[lang][phrase] || phrase
}