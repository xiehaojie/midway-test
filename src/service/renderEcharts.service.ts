// src/service/renderEharts.service.ts
import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as Default_options from '../../public/js/defaultOptions.js';
@Provide()
export class RenderEchartsService {
  @Inject()
  ctx: Context;
  // 注入puppeteer
  @Inject('puppeteer')
  puppeteerTool;
  // 注入lodash
  @Inject('lodash')
  _;
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
    let chartWidth = Number(chartsConfig.width);
    let chartHeight = Number(chartsConfig.height);
    let version = Number(chartsConfig.version) || 5;
    //  模版类型
    const tempType = chartsConfig.tempType;

    // 整合内置options
    const defaultOpt = Default_options[tempType];

    if (defaultOpt) {
      chartConfig = this._.merge({}, defaultOpt, chartConfig);
    }
    // 动态设置柱状图是否展示label
    const isShowLabel = Number(chartsConfig.showLable);
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

    chartWidth = chartWidth || 800;
    chartHeight = chartHeight || 400;
    version = version || 5;
    // // 渲染到body上
    await this.ctx.render('echarts.ejs', {
      chartConfigStr: JSON.stringify(chartConfig),
      chartWidth,
      chartHeight,
      version,
    });
    // 启动Puppeteer浏览器实例
    const browser = await this.puppeteerTool.launch({ headless: true });
    // 创建一个新的页面
    const page = await browser.newPage();

    // 提前加载资源防止后续setContent不生效
    await page.addScriptTag({
      url: `http://localhost:7001/charts/echarts${version}.min.js`,
    });
    await page.addScriptTag({ url: 'http://localhost:7001/charts/china.js' });
    // 页面直接渲染body上的内容，并等待无请求后
    await page.setContent(this.ctx.body);
    // 截图，返回base64编码
    const imgBase64 = await page
      .screenshot({ encoding: 'base64', fullPage: true })
      .then(data => {
        return `data:image/png;base64,${data}`;
      });
    // 关闭浏览器实例
    await browser.close();
    // 返回页面标题
    return imgBase64;
  }
}
