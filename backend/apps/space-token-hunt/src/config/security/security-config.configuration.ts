import { SecurityConfig } from './security-config.type';

export const securityConfiguration = (): SecurityConfig => {
  return {
    security: {
      jwtSecret: process.env.SECURITY_JWT_SECRET,
    },
  };
};
