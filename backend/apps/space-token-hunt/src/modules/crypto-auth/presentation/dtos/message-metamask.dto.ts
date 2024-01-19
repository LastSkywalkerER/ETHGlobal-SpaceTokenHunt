import { IsNotEmpty, IsString } from 'class-validator';

export class MessageMetamaskDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
