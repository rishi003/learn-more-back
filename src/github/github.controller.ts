import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateConnectorDto } from './dto/createConnector.dto';
import { GithubServices } from './github.services';

@Controller('github')
export class GithubController {
  constructor(private githubServices: GithubServices) {}

  @Get('/callback')
  callback(@Query() queryParams) {
    return queryParams.code;
  }

  @Get('/auth/:clientid')
  codeRedirect(@Param('clientid') clientId, @Res() res) {
    return res.redirect(process.env.GITHUB_CODE_URL + `&client_id=${clientId}`);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createConnector(
    @Body() createConnectorDto: CreateConnectorDto,
  ): Promise<CreateConnectorDto> {
    return this.githubServices.create(createConnectorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('retrive/:clientId')
  getClient(@Param('clientId') clientId) {
    return this.githubServices.retrive(clientId);
  }
}
