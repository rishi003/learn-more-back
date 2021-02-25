import { IsNotEmpty } from 'class-validator';

export class CreateConnectorDto {
  @IsNotEmpty()
  public readonly clientId: string;
  @IsNotEmpty()
  public readonly clientSecret: Buffer;
}
