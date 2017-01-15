export default store => next => action => {
    const { getRandomId, ...rest} = action
    const id = new Date().getTime().toString() + (Math.floor(Math.random() * 100) + 1).toString();

    if (!getRandomId) return next(action)
    next({
        ...rest,
        randomId: id
    })
}