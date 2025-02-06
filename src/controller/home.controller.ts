import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;
  @Get('/')
  async home(): Promise<string> {
    // 返回调试页面，便于调试。
    return await this.ctx.render('chartsDebug.ejs');
  }
}
