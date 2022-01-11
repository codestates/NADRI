import { SETUSERINFO } from "../actions";

export const getUserInfo = (state={}, action) => {
  switch (action.type) {
    case SETUSERINFO:
      const {email, nickname, createdAt} = action.payload.userInfo
      return {
        email,
        nickname,
        createdAt
      }
      break;

      default :
      return state
  }
}