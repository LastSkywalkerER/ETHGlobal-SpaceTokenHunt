import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  protected readonly serializedName: string;
  protected readonly description: string;

  constructor(
    serializedName: string,
    status: number,
    description,
    response = '',
  ) {
    super(response, status);

    this.description = description;
    this.serializedName = serializedName;
  }

  public getDescription(): string {
    return this.description;
  }

  public getSerializedName(): string {
    return this.serializedName;
  }
}
