import { combineReducers } from "redux"
import {loginReducer, signupReducer} from './Modal'

const rootReducer = combineReducers({loginReducer, signupReducer})

export default rootReducer