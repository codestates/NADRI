import {LOGIN_CLICK, SIGNUP_CLICK, G_LOGIN_CLICK, K_LOGIN_CLICK, LOGIN_SUCCESS} from '../actions/index'

export const loginReducer = (state=false, action) => {

  switch (action.type) {
    case LOGIN_CLICK:
      return !(action.payload.LoginModalState)
      break;

    default :
    return false
  }
  
}

export const signupReducer = (state=false, action) => {
  switch (action.type) {
    case SIGNUP_CLICK:
      return !action.payload.SignupModalState
      break;

    default :
    return false
  }
  
}

export const gLoginReducer = (state=false ,action) => {
  switch (action.type) {
    case G_LOGIN_CLICK:
      return true;
      
    default :
    return state;
  }
}

export const kLoginReducer = (state=false, action) => {
  switch (action.type) {
    case K_LOGIN_CLICK:
      return !action.payload.kLoginState
      
    default :
    return false;
  }
}

export const isLoginReducer = (state=false, action) => {
  switch (action.type){
    case LOGIN_SUCCESS:
      return true;

    default :
    return false;
  }
}