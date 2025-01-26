import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { RenderEchartsService } from '../service/renderEcharts.service';
@Controller('/')
export class RenderEchartsController {
  @Inject()
  ctx: Context;
  @Inject()
  renderEchartsService: RenderEchartsService;
  @Post('/echarts')
  async home(@Body() chartsConfig: any): Promise<string> {
    console.log('chartsConfig', chartsConfig);
    return await this.renderEchartsService.testPuppeteer(chartsConfig);
    // return await this.ctx.render('chartsDebug.ejs');
    // return 'Hello Midwayjs!';
  }
}
