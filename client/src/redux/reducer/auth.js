import { AUTH_REQUEST } from "../actions";

export const changeAuthState = (state=false, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return !action.payload.authState
      break;

      default :
      return state
  }
}