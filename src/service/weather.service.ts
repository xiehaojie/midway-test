// src/service/weather.service.ts
import { Inject, Provide, makeHttpRequest } from '@midwayjs/core';
import { WeatherInfo } from '../interface';
import { Context } from '@midwayjs/koa';
import { WeatherEmptyDataError } from '../error/weather.error';

@Provide()
export class WeatherService {
  @Inject()
  ctx: Context;

  @Inject('puppeteer')
  puppeteerTool;
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
}
