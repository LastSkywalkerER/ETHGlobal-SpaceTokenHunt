import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  address: string;
}
