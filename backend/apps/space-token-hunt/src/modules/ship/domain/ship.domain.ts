import { Inject, Injectable } from '@nestjs/common';

import { SHIP_POSITION_REPOSITORY_TOKEN } from '../core/tokens';
import {
  ShipRepository,
  ShipPositionRepositoryInterface,
} from '../infrastructure';

import {
  CreateShipPositionParameters,
  CreateTemporaryShipPositionParameters,
  DeleteTemporaryShipPositionParameters,
  GetCurrentUserShipPositionParameters,
  GetTemporaryShipPositionParameters,
  UpdateShipPositionParameters,
} from './ship.domain-type';

@Injectable()
export class ShipDomain {
  constructor(
    private readonly shipRepository: ShipRepository,
    @Inject(SHIP_POSITION_REPOSITORY_TOKEN)
    private readonly shipPositionRepository: ShipPositionRepositoryInterface,
  ) {}

  public async createShipPosition(data: CreateShipPositionParameters) {
    const entity = await this.shipRepository.create(data);
    await this.shipRepository.save(entity);
    return entity;
  }

  public async createTemporaryShipPosition({
    userId,
    x,
    y,
    z,
  }: CreateTemporaryShipPositionParameters) {
    await this.shipPositionRepository.set({
      key: `${userId}`,
      value: {
        x,
        y,
        z,
      },
    });
  }

  public async getTemporaryShipPosition({
    userId,
  }: GetTemporaryShipPositionParameters) {
    const position = await this.shipPositionRepository.get({
      key: `${userId}`,
    });

    return position;
  }

  public async getCurrentUserShipPosition({
    userUuid,
  }: GetCurrentUserShipPositionParameters) {
    const data = await this.shipRepository.findOne({
      where: {
        userId: userUuid,
      },
    });
    console.log({ data });

    return data;
  }

  public async updateShipPosition({
    userId,
    x,
    y,
    z,
  }: UpdateShipPositionParameters) {
    const entity = await this.shipRepository.update({ userId }, { x, y, z });
    return entity;
  }

  public async deleteTemporaryShipPosition({
    userId,
  }: DeleteTemporaryShipPositionParameters) {
    await this.shipPositionRepository.remove({
      key: `${userId}`,
    });
  }
}
