import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubServices {
  private readonly accessToken: string;
  getAccessToken() {}
}
