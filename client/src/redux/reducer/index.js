import { combineReducers } from "redux"
import {loginReducer, signupReducer, gLoginReducer, kLoginReducer, isLoginReducer} from './Modal'
import { changeAuthState } from "./auth"

const rootReducer = combineReducers({loginReducer, signupReducer, changeAuthState, gLoginReducer, kLoginReducer, isLoginReducer})

export default rootReducer