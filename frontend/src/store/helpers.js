function globalReducer(state, action) {
    switch (action.type) {
        case "SET_LANG":
            let updatedLanguages = state.languages.map(lang => {
                lang.active = lang.code == action.payload ? true : false
                return lang
            })
            return { ...state, languages: updatedLanguages }
        default:
            return state;
    }
}

export {
    globalReducer
}