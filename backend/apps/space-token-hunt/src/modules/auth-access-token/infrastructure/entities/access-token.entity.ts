import { Transform } from 'class-transformer';

export class AccessTokenEntity {
  accessToken: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  loggedAt: Date;
}
