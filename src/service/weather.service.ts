// src/service/weather.service.ts
import { Inject, Provide, makeHttpRequest } from '@midwayjs/core';
import { WeatherInfo } from '../interface';
import puppeteer from 'puppeteer';
import { Context } from '@midwayjs/koa';
import { WeatherEmptyDataError } from '../error/weather.error';
// import { WeatherDTO } from '../dto/weather';

@Provide()
export class WeatherService {
  @Inject()
  ctx: Context;
  async getWeather(cityId: string): Promise<WeatherInfo> {
    // this.ctx.logger.info(
    //   'requestContext',
    //   (await this.ctx.requestContext.getAsync(WeatherService)).ctx
    // );
    if (!cityId) {
      throw new WeatherEmptyDataError();
    }
    const result = await makeHttpRequest<WeatherInfo>(
      `https://midwayjs.org/resource/${cityId}.json`,
      {
        dataType: 'json',
      }
    );
    if (result.status === 200) {
      return result.data as WeatherInfo;
    }
  }
  /**
   * 使用Puppeteer进行测试的异步函数
   * @returns 返回页面标题的Promise
   */
  async testPuppeteer(): Promise<string> {
    // 启动Puppeteer浏览器实例
    const browser = await puppeteer.launch();
    // 创建一个新的页面
    const page = await browser.newPage();
    // 导航到指定的URL
    await page.goto('http://localhost:7001/weather?cityId=101010100', {
      waitUntil: 'networkidle0',
    });
    // 截图
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    // // 执行JavaScript代码
    // const result = await page.evaluate(() => {

    //   return document.title;
    // });
    // 获取页面的标题
    // const title = await page.title();
    // 打印页面标题到控制台
    // console.log(title);
    // 关闭浏览器实例
    await browser.close();
    // 返回页面标题
    return '123';
  }
}
