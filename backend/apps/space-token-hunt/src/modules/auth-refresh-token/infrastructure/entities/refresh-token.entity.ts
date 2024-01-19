import { Transform } from 'class-transformer';

export class RefreshTokenEntity {
  refreshToken: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  loggedAt: Date;
}
