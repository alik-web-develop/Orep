function globalReducer(state, action) {
    switch (action.type) {
        case "SET_LANG":
            let updatedLanguages = state.languages.map(lang => {
                lang.active = lang.code == action.payload ? true : false
                return lang
            })
            return { ...state, languages: updatedLanguages }
        case "ADD_TO_BASKET":
            return { ...state, basket: [...state.basket, action.payload] }
        case "REMOVE_FROM_BASKET":
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.payload)
            }
        case "inc":
            return { ...state, basket: action.payload }
        case "dec":
            return { ...state, basket: action.payload }
        default:
            return state;
    }
}

function getFromLocalStorage(key, defaultValue = "[]") {
    let items = localStorage.getItem(key) ?? defaultValue
    return JSON.parse(items) // [...]
}

function addNewUserToLocalStorage(new_user) {
    let existingUsers = getFromLocalStorage('users')

    if (userExistsInDB(new_user)) {
        return false
    } else {
        existingUsers.push(new_user)
        localStorage.setItem('users', JSON.stringify(existingUsers))
        return true
    }
}

function userExistsInDB({ username, password }) {
    let users = getFromLocalStorage('users')
    for (let user of users) {
        if (user.username == username && user.password == password) {
            return true
        }
    }
    return false
}
export {
    globalReducer
}