export interface ApplicationConfig {
  application: {
    accessTokenLifetimeInMilliseconds: number;
    loginMessageLifetimeInMilliseconds: number;
    port: number;
    refreshTokenLifetimeInMilliseconds: number;
  };
}
