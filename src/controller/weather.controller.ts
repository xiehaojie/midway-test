import { Controller, Get, Inject, Query } from '@midwayjs/core';
// import { WeatherInfo } from '../interface';
import { WeatherService } from '../service/weather.service';
import { Context } from '@midwayjs/koa';
// import { WeatherDTO } from '../dto/weather';
// import { WeatherInfo } from '../interface';

@Controller('/')
export class WeatherController {
  @Inject()
  weatherService: WeatherService;
  @Inject()
  ctx: Context;
  // 这里是装饰器，定义一个路由
  @Get('/weather')
  async getWeatherInfo(@Query('cityId') cityId: string): Promise<void> {
    // 这里是 http 的返回，可以直接返回字符串，数字，JSON，Buffer 等
    const result = await this.weatherService.getWeather(cityId);
    if (result) {
      await this.ctx.render('info.njk', result.weatherinfo);
    }
  }
  @Get('/getWeatherPage')
  async screenShotWeatherInfoPage(): Promise<void> {
    await this.weatherService.testPuppeteer();
  }
}
