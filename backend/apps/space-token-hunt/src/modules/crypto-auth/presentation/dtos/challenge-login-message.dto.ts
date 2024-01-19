import { IsNotEmpty, IsString } from 'class-validator';

export class ChallengeLoginMessageDto {
  @IsString()
  @IsNotEmpty()
  address: string;
}
