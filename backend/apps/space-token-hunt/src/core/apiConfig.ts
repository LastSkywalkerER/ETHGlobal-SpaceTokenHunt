const apiConfigBase = {
  prefix: '/api',
  version: '/v1',
};
export const basePath = `${apiConfigBase.prefix}${apiConfigBase.version}`;
export const apiConfig = {
  cryptoAuth: {
    authLogin: `${basePath}/crypto/auth`,
    verifyMessage: `${basePath}/crypto/verify`,
    refreshToken: `${basePath}/crypto/refresh-token`,
    logout: `${basePath}/crypto/logout`,
  },
  user: {
    getUser: `${basePath}/user`,
  },
  token: {
    getTokens: `${basePath}/tokens`,
  },
  ship: {
    getCurrentUserShipPosition: `${basePath}/ship-position`,
  },
  rating: {
    getRatingBoard: `${basePath}/rating-board`,
  },
};
