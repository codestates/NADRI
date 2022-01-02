export const LOGIN_CLICK = 'LOGIN_CLICK'

export const loginModal = (LoginModalstate) => {
  return {
    type: LOGIN_CLICK,
    payload: {
      LoginModalstate
    }
  }
}