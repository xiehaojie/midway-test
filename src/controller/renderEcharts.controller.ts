import { Body, Controller, Inject, Post,Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { RenderEchartsService } from '../service/renderEcharts.service';
@Controller('/')
export class RenderEchartsController {
  @Inject()
  ctx: Context;
  @Inject()
  renderEchartsService: RenderEchartsService;
  @Get('/getEchartsHtml')
  async getEchartsPage(): Promise<string> {
    return await this.ctx.render('echarts.ejs', this.ctx.echartsConfig);
  }
  @Post('/echarts')
  async getEcharts(@Body() chartsConfig: any): Promise<string> {
    this.ctx.echartsConfig = chartsConfig;
    return await this.renderEchartsService.generateEcharts(chartsConfig);
    // return await this.ctx.render('chartsDebug.ejs');
    // return 'Hello Midwayjs!';
  }
}
