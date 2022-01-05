import {LOGIN_CLICK, SIGNUP_CLICK} from '../actions/index'

export const loginReducer = (state=false, action) => {

  switch (action.type) {
    case LOGIN_CLICK:
      return !action.payload.LoginModalState
      break;

    default :
    return state
  }
  
}

export const signupReducer = (state=false, action) => {
  switch (action.type) {
    case SIGNUP_CLICK:
      return !action.payload.SignupModalState
      break;

    default :
    return state
  }
  
}