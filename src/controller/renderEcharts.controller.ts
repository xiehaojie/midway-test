import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { RenderEchartsService } from '../service/renderEcharts.service';
import { ChartsConfigDTO } from '../dto/charts';
@Controller('/')
export class RenderEchartsController {
  @Inject()
  ctx: Context;
  @Inject()
  renderEchartsService: RenderEchartsService;
  @Post('/echarts')
  async getEcharts(@Body() chartsConfig: ChartsConfigDTO): Promise<string> {
    return await this.renderEchartsService.generateEcharts(
      this.ctx,
      chartsConfig
    );
  }
}
