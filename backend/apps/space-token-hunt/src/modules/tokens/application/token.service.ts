import { Injectable } from '@nestjs/common';

import { ShipDomain } from '../../ship/domain';
import { TokenDomain } from '../domain/token.domain';

import {
  CreateCoordinateAroundShipParameters,
  GetTokensParameters,
} from './token.service-type';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenDomain: TokenDomain,
    private readonly shipDomain: ShipDomain,
  ) {}

  private createCoordinateAroundShip({
    shipPosition,
  }: CreateCoordinateAroundShipParameters) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * (50 - 5) + 5;
    const offsetX = Math.cos(angle) * distance;
    const offsetZ = Math.sin(angle) * distance;

    return {
      x: shipPosition.x + offsetX,
      y: 1,
      z: shipPosition.z + offsetZ,
    };
  }

  public async getTokens({ userId }: GetTokensParameters) {
    const tokens = await this.tokenDomain.getTokens();
    const shipPosition = await this.shipDomain.getTemporaryShipPosition({
      userId,
    });

    const data = tokens.map((token) => ({
      ...token,
      position: this.createCoordinateAroundShip({
        shipPosition,
      }),
    }));

    console.log(data);

    return '';
  }
}
