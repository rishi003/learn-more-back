import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class GithubUtilsServices {
  constructor(httpService: HttpService) {}
}
