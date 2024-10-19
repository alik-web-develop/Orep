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

export {
    globalReducer
}