import { Repository } from 'space-token-hunt/redis';

import { ShipPositionEntity } from '../entities';

export interface ShipPositionRepositoryInterface
  extends Repository<ShipPositionEntity> {}

export interface GetShipPositionParameters {
  userId: string;
}

export interface RemoveShipPositionParameters {
  userId: string;
}
