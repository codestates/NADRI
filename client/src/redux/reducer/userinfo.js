import { SETUSERINFO, CHANGE_USER_NICKNAME, CHANGE_PROFILE } from "../actions";


export const getUserInfo = (state={}, action) => {
  switch (action.type) {
    case SETUSERINFO:
      return Object.assign({},action.payload.userInfo)
      break;

    case CHANGE_USER_NICKNAME:
      // console.log(action.payload.inputs)
      return Object.assign(state, {nickname: action.payload.nickname})
      break;

    case CHANGE_PROFILE:
      
      return Object.assign(state, {image: action.payload.profile})

      default :
      return state
  }
}