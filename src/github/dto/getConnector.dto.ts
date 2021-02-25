export class GetConnectorDto {
  public clientId: string;
  public clientSecret: string;
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }
}
