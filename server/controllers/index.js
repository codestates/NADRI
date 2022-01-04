module.exports = {
  // auth
  code: require('./auth/code'),
  login: require('./auth/login'),
  logout: require('./auth/logout'),
  signup: require('./auth/signup'),
  signout: require('./auth/signout'),

  // comment
  comment: require('./comment'),

  // like
  like: require('./like'),

  // post
  post: require('./post'),

  // me
  me: require('./me'),
};
