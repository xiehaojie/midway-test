// src/service/renderEharts.service.ts
import { Inject, Provide, makeHttpRequest } from '@midwayjs/core';
import { WeatherInfo } from '../interface';
import { Context } from '@midwayjs/koa';
import { WeatherEmptyDataError } from '../error/weather.error';
import * as Default_options from '../../public/js/defaultOptions.js';
@Provide()
export class RenderEchartsService {
  @Inject()
  ctx: Context;
  @Inject('puppeteer')
  puppeteerTool;
  @Inject('lodash')
  _;
  async getWeather(cityId: string): Promise<WeatherInfo> {
    if (!cityId) {
      throw new WeatherEmptyDataError();
    }
    try {
      const result = await makeHttpRequest<WeatherInfo>(
        `https://midwayjs.org/resource/${cityId}.json`,
        {
          dataType: 'json',
        }
      );
      if (result.status === 200) {
        return result.data as WeatherInfo;
      } else {
        throw new WeatherEmptyDataError();
      }
    } catch (error) {
      throw new WeatherEmptyDataError();
    }
  }
  /**
   * 使用Puppeteer进行测试的异步函数
   * @returns 返回页面标题的Promise
   */
  async testPuppeteer(chartsConfig: any): Promise<string> {
    const weatherData = await this.getWeather('101010100');
    // console.log(chartsConfig);
    // let chartConfig = chartsConfig.chartConfig;
    // let chartWidth = Number(chartsConfig.width);
    // let chartHeight = Number(chartsConfig.height);
    // let version = Number(chartsConfig.version) || 5;
    // //  模版类型
    // let tempType = chartsConfig.tempType;

    // // 整合内置options
    // const defaultOpt = Default_options[tempType];

    // if( defaultOpt ){
    //   chartConfig = _.merge({}, defaultOpt, chartConfig);
    // }
    // 渲染到body上
    await this.ctx.render('info.njk', weatherData.weatherinfo);
    // 启动Puppeteer浏览器实例
    const browser = await this.puppeteerTool.launch({ headless: true });
    // 创建一个新的页面
    const page = await browser.newPage();
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
