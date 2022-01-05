import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer";
// import thunk from "redux-thunk";

//! 아래 두 모듈은 배포 단계에서는 쓰지 않을 것임
// development 단계에서 로깅용으로 사용 
import logger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'

// 개발 단계 끝나면 주석처리 할것 아래 코드
const enhancer = composeWithDevTools(applyMiddleware(logger))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const store = createStore(
  rootReducer,
  enhancer, //! 개발 단계 끝나면 주석 처리 할 것
  // composeEnhancers(applyMiddleware(thunk))
);

export default store;
