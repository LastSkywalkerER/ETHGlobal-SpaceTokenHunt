import { Injectable } from '@nestjs/common';

import { ShipDomain } from '../domain/ship.domain';

import { GetCurrentUserShipPositionParameters } from './ship.service-type';

@Injectable()
export class ShipService {
  constructor(private readonly shipDomain: ShipDomain) {}

  public async getCurrentUserShipPosition({
    userUuid,
  }: GetCurrentUserShipPositionParameters) {
    return await this.shipDomain.getCurrentUserShipPosition({ userUuid });
  }
}
