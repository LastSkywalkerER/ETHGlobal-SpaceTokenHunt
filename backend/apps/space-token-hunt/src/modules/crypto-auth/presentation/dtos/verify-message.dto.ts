import { IsString } from 'class-validator';

export class VerifyMessageDto {
  @IsString()
  address: string;

  @IsString()
  signature: string;
}
