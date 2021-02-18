import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { GithubConnector } from './entities/github.entity';

@Injectable()
export class GithubServices {
  private readonly accessToken: string;

  constructor(
    private httpService: HttpService,
    @InjectRepository(GithubConnector)
    githubConnectorRepository: Repository<GithubConnector>,
  ) {}

  // TODO: Create a service to insert a github connector.
  // async createConnector(): Promise<GithubConnector | undefined>{
  //   const
  // }

  async getAccessToken(clientId): Promise<Observable<any>> {
    return this.httpService.post(process.env.GITHUB_ACCESS_TOKEN_URL, {});
  }
}
