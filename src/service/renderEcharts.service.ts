// src/service/renderEharts.service.ts
import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as Default_options from '../../public/js/defaultOptions.js';
import { PuppeteerService } from '../provider/puppeteer.js';
@Provide()
export class RenderEchartsService {
  // 注入PuppeteerService
  @Inject()
  private puppeteerService: PuppeteerService;
  @Inject()
  ctx: Context;
  // 注入lodash
  @Inject('lodash')
  private _: any;
  /**
   * 使用Puppeteer进行测试的异步函数
   * @returns 返回页面标题的Promise
   */
  /**
   * 生成ECharts图表的异步函数
   * @param chartsConfig - 包含图表配置的对象
   * @returns 返回生成的ECharts图表的Base64编码字符串
   */
  async generateEcharts(chartsConfig: any): Promise<string> {
    // 图表配置
    let chartConfig = chartsConfig.chartConfig;
    const chartWidth = chartsConfig.width;
    const chartHeight = chartsConfig.height;
    const version = chartsConfig.version;
    //  模版类型
    const tempType = chartsConfig.tempType;

    // 整合内置options
    const defaultOpt = Default_options[tempType];

    if (defaultOpt) {
      chartConfig = this._.merge({}, defaultOpt, chartConfig);
    }
    // 动态设置柱状图是否展示label
    const isShowLabel = chartsConfig.showLabel;
    if (tempType.includes('bar')) {
      chartConfig.series = chartConfig.series.map(serie => {
        const newSerics = this._.merge({}, serie, {
          label: {
            show: !!isShowLabel,
          },
        });
        return newSerics;
      });
    }
    // 动态设置地图的max
    if (tempType === 'map') {
      const valueData = chartConfig.series[0].data.map(a => {
        return a.value;
      });
      const maxData = valueData.reduce((a, b) => {
        return Math.max(a, b);
      });
      const minData = valueData.reduce((a, b) => {
        return Math.min(a, b);
      });

      chartConfig.visualMap.max = maxData || 100000;
      chartConfig.visualMap.min = minData || 0;
    }

    // // 渲染到请求总用于的body上
    await this.ctx.render('echarts.ejs', {
      chartConfigStr: JSON.stringify(chartConfig),
      chartWidth,
      chartHeight,
      version,
    });
    // 获取渲染后的HTML内容
    const htmlContent = this.ctx.body as string;
    return await this.renderEcharts(version, htmlContent);
  }
  private async renderEcharts(
    version: number,
    htmlContent: string
  ): Promise<string> {
    try {
      // 选择echarts版本
      // 提前加载资源防止后续setContent不生效
      const newPage = await this.puppeteerService.newPage();
      await newPage.addScriptTag({
        url: `http://localhost:7001/charts/echarts${version}.min.js`,
      });
      await newPage.addScriptTag({
        url: 'http://localhost:7001/charts/china.js',
      });
      // 页面直接渲染body上的内容，并等待无请求后
      await newPage.setContent(htmlContent);
      // 截图，返回base64编码
      return await newPage
        .screenshot({ encoding: 'base64', fullPage: true })
        .then(data => {
          newPage.close();
          return `data:image/png;base64,${data}`;
        });
    } catch (error) {
      console.error('Rendering failed, retrying...', error);
      // 出现后重启浏览器
      await this.puppeteerService.destroy();
      await this.puppeteerService.init();
      return this.renderEcharts(version, htmlContent);
    }
  }
}
