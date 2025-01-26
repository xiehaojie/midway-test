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
  async getEcharts(@Body() chartsConfig: any): Promise<string> {
    return await this.renderEchartsService.generateEcharts(chartsConfig);
  }
}
