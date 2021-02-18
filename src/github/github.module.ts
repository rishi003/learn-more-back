import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { GithubConnector } from './entities/github.entity';
import { GithubController } from './github.controller';
import { GithubServices } from './github.services';

@Module({
  providers: [GithubServices],
  exports: [GithubServices],
  controllers: [GithubController],
  imports: [
    HttpModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([GithubConnector]),
  ],
})
export class GithubModule {}
