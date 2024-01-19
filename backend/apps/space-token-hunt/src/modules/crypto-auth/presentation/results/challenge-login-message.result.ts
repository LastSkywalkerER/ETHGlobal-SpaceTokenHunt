import { IsNotEmpty } from 'class-validator';
import { MessageMetamaskDto } from '../dtos';

export class ChallengeLoginMessageResult {
  @IsNotEmpty()
  data: MessageMetamaskDto;
}
