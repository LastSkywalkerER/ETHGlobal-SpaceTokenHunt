import { ApplicationConfig } from './application-config.type';

export const applicationConfiguration = (): ApplicationConfig => {
  return {
    application: {
      port: parseInt(process.env.PORT, 10),
      loginMessageLifetimeInMilliseconds: parseInt(
        process.env.LOGIN_MESSAGE_LIFETIME_MILLISECONDS,
        10,
      ),
      accessTokenLifetimeInMilliseconds: parseInt(
        process.env.ACCESS_TOKEN_LIFETIME_MILLISECONDS,
        10,
      ),
      refreshTokenLifetimeInMilliseconds: parseInt(
        process.env.REFRESH_TOKEN_LIFETIME_MILLISECONDS,
        10,
      ),
    },
  };
};
