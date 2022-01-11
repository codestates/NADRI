import {LOGIN_CLICK, SIGNUP_CLICK, G_LOGIN_CLICK, K_LOGIN_CLICK} from '../actions/index'

export const loginReducer = (state=false, action) => {

  switch (action.type) {
    case LOGIN_CLICK:
      return !(action.payload.LoginModalState)
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

export const gLoginReducer = (state=false ,action) => {
  switch (action.type) {
    case G_LOGIN_CLICK:
      return !action.payload.gLoginState
      
    default :
    return state;
  }
}

export const kLoginReducer = (state=false, action) => {
  switch (action.type) {
    case K_LOGIN_CLICK:
      return !action.payload.kLoginState
      
    default :
    return state;
  }
}
