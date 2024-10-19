import { createContext } from 'react'
import { globalReducer } from './helpers'

const context = createContext()

const initialState = {
    languages: [
        { code: "en", active: true },
        { code: "ru", active: false },
        { code: "uz", active: false }
    ],
    basket:[]
}

export {
    context,
    initialState,
    globalReducer
}