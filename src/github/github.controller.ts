import { Controller, Get, Param, Query, Res } from '@nestjs/common';

@Controller('github')
export class GithubController {
  @Get('/callback')
  callback(@Query() queryParams) {}

  @Get('/auth/:clientid')
  codeRedirect(@Param('clientid') clientId, @Res() res) {
    return res.redirect(process.env.GITHUB_CODE_URL + `&client_id=${clientId}`);
  }
}
