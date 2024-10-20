import { createContext } from 'react'
import { globalReducer } from './helpers'

const BASE_URL = "http://localhost:3000/"
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
    BASE_URL,
    context,
    initialState,
    globalReducer
}