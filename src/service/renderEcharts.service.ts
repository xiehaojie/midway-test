// src/service/renderEharts.service.ts
import { Inject, Provide, Init, Destroy, Singleton } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as Default_options from '../../public/js/defaultOptions.js';
@Provide()
// 作用域固化，确保当前服务服务实例一直挂在进程中，直到销毁。当前ctx 为服务实例，非请求作用域。
@Singleton()
export class RenderEchartsService {
  // 注入puppeteer
  @Inject('puppeteer')
  puppeteerTool;
  // 注入lodash
  @Inject('lodash')
  _;

  // 存储浏览器实例的实例变量
  private browser: any;
  private page: any;
  /**
   * 服务初始化方法，在服务启动时调用
   */
  @Init()
  async init() {
    // 启动Puppeteer浏览器实例
    this.browser = await this.puppeteerTool.launch({
      headless: true,
    });
    this.page = await this.browser.newPage();
    // 提前加载资源防止后续setContent不生效
    await this.page.addScriptTag({
      url: 'http://localhost:7001/charts/china.js',
      id: 'chinaMap',
    });
  }
  @Destroy()
  async destroy() {
    if (this.browser) {
      // 关闭浏览器实例
      await this.browser.close();
    }
  }
  /**
   * 使用Puppeteer进行测试的异步函数
   * @returns 返回页面标题的Promise
   */
  /**
   * 生成ECharts图表的异步函数
   * @param chartsConfig - 包含图表配置的对象
   * @returns 返回生成的ECharts图表的Base64编码字符串
   */
  async generateEcharts(reqCtx: Context, chartsConfig: any): Promise<string> {
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
    await reqCtx.render('echarts.ejs', {
      chartConfigStr: JSON.stringify(chartConfig),
      chartWidth,
      chartHeight,
      version,
    });
    // 获取渲染后的HTML内容
    const htmlContent = reqCtx.body as string;
    // 返回结果
    await this.renderEcharts(version, htmlContent).catch(async error => {
      console.error('Rendering failed, retrying...', error);
      await this.destroy();
      await this.init();
      return this.renderEcharts(version, htmlContent);
    });
  }
  private async renderEcharts(
    version: number,
    htmlContent: string
  ): Promise<string> {
    // 选择echarts版本
    await this.page.addScriptTag({
      url: `http://localhost:7001/charts/echarts${version}.min.js`,
    });
    // 页面直接渲染body上的内容，并等待无请求后
    await this.page.setContent(htmlContent);
    // 截图，返回base64编码
    return await this.page
      .screenshot({ encoding: 'base64', fullPage: true })
      .then(data => {
        return `data:image/png;base64,${data}`;
      });
  }
}
