import { combineReducers } from "redux"
import {loginReducer, signupReducer, gLoginReducer, kLoginReducer} from './Modal'
import { changeAuthState } from "./auth"
// redux-persist 코드
import { persistReducer } from 'redux-persist'
// localStorage 에 저장
import storage from "redux-persist/lib/storage";

// reducer에 persist store 정의
const persistConfig = {
    key: 'root',
    // localStorage에 저장
    storage,
    // localStorage에 저장할 리듀서만 화이트리스트에 저장
    whitelist: ['gLoginReducer', 'kLoginReducer']
}

const rootReducer = combineReducers({loginReducer, signupReducer, changeAuthState, gLoginReducer, kLoginReducer})

export default persistReducer(persistConfig, rootReducer)
// export default rootReducer