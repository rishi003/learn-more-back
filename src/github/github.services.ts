import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateConnectorDto } from './dto/createConnector.dto';
import { GetConnectorDto } from './dto/getConnector.dto';
import { GithubConnector } from './entities/github.entity';

@Injectable()
export class GithubServices {
  private readonly accessToken: string;

  constructor(
    private httpService: HttpService,
    @InjectRepository(GithubConnector)
    private githubConnectorRepository: Repository<GithubConnector>,
  ) {}

  async create(
    createConnectorDto: CreateConnectorDto,
  ): Promise<GithubConnector | undefined> {
    const connector: GithubConnector = this.githubConnectorRepository.create(
      createConnectorDto,
    );
    this.githubConnectorRepository.save(connector);
    return connector;
  }

  async retrive(clientId: string): Promise<GetConnectorDto | undefined> {
    const connector: GithubConnector = await this.githubConnectorRepository.findOne(
      {
        where: {
          clientId: clientId,
        },
      },
    );
    const { clientSecret } = connector;
    const dto: GetConnectorDto = new GetConnectorDto(
      clientId,
      clientSecret.toString(),
    );
    return dto;
  }

  async getAccessToken(clientId): Promise<Observable<any>> {
    return this.httpService.post(process.env.GITHUB_ACCESS_TOKEN_URL, {});
  }
}
