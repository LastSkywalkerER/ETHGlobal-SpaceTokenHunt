import { applicationConfiguration } from './application';
import { redisConfiguration } from './redis';
import { securityConfiguration } from './security';

export const configuration = [
  applicationConfiguration,
  redisConfiguration,
  securityConfiguration,
];
