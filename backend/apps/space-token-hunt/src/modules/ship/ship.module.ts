import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user';

import { ShipService } from './application';
import { SHIP_POSITION_REPOSITORY_TOKEN } from './core/tokens';
import { ShipDomain } from './domain';
import {
  ShipEntity,
  ShipPositionRepository,
  ShipRepository,
} from './infrastructure';
import { ShipController } from './presentation';
import { ShipGateway } from './presentation/ship.gateway';

@Module({
  controllers: [ShipController],
  exports: [ShipDomain, ShipRepository, ShipGateway],
  imports: [
    TypeOrmModule.forFeature([ShipEntity]),
    HttpModule,
    forwardRef(() => UserModule),
  ],
  providers: [
    ShipDomain,
    ShipRepository,
    ShipService,
    ShipGateway,
    {
      provide: SHIP_POSITION_REPOSITORY_TOKEN,
      useClass: ShipPositionRepository,
    },
  ],
})
export class ShipModule {}
