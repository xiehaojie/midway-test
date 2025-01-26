import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;
  @Get('/')
  async home(): Promise<string> {
    return await this.ctx.render('chartsDebug.ejs');
    // return 'Hello Midwayjs!';
  }
}
