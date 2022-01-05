import { combineReducers } from "redux"
import {loginReducer, signupReducer} from './Modal'
import { changeAuthState } from "./auth"
import { getUserInfo } from "./userinfo"

const rootReducer = combineReducers({loginReducer, signupReducer, changeAuthState, getUserInfo})

export default rootReducer