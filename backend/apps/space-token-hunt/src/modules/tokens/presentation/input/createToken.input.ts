import { IsNotEmpty } from 'class-validator';

export class GetTokenHistorytDTO {
  @IsNotEmpty()
  readonly limit: number;
  @IsNotEmpty()
  readonly offset: number;
}
