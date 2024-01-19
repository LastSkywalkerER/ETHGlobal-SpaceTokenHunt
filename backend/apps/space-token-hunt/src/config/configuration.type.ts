import { ApplicationConfig } from './application';
import { RedisConfig } from './redis';
import { SecurityConfig } from './security';

export interface Config
  extends ApplicationConfig,
    RedisConfig,
    SecurityConfig {}
