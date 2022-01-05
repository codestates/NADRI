import { combineReducers } from "redux"
import {loginReducer, signupReducer} from './Modal'
import { changeAuthState } from "./auth"

const rootReducer = combineReducers({loginReducer, signupReducer, changeAuthState})

export default rootReducer