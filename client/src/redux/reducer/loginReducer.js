import {LOGIN_CLICK} from '../actions/index'

const loginReducer = (state=false, action) => {

  switch (action.type) {
    case LOGIN_CLICK:
      return {
        state: !action.payload.LoginModalstate
      }
      
    default :
    return false
  }
  
}

export default loginReducer