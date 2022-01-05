import { SETUSERINFO } from "../actions";

export const getUserInfo = (state={}, action) => {
  switch (action.type) {
    case SETUSERINFO:
      const {email, nickname} = action.payload.userInfo
      return {
        email,
        nickname
      }
      break;

      default :
      return state
  }
}