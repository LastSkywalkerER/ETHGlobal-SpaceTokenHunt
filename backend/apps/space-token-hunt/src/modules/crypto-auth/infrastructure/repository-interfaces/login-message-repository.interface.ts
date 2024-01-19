import { Repository } from 'space-token-hunt/redis';

import { LoginMessageEntity } from '../entities';

export interface LoginMessageRepositoryInterface
  extends Repository<LoginMessageEntity> {}
