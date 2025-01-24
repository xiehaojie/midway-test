import { ContentType, Controller, Get, Inject, Query } from '@midwayjs/core';
// import { WeatherInfo } from '../interface';
import { WeatherService } from '../service/weather.service';
import { Context } from '@midwayjs/koa';
// import { WeatherDTO } from '../dto/weather';
// import { WeatherDTO } from '../dto/weather';

@Controller('/')
export class WeatherController {
  @Inject()
  weatherService: WeatherService;
  @Inject()
  ctx: Context;
  // 这里是装饰器，定义一个路由
  @ContentType('html')
  @Get('/weather')
  async getWeatherInfo(@Query('cityId') cityId: string): Promise<void> {
    // 这里是 http 的返回，可以直接返回字符串，数字，JSON，Buffer 等
    const result = await this.weatherService.getWeather(cityId);
    if (result) {
      await this.ctx.render('info.njk', result.weatherinfo);
    }
  }
  @ContentType('application/json')
  @Get('/getWeatherPage')
  async screenShotWeatherInfoPage(): Promise<string> {
    const imgBase64 = await this.weatherService.testPuppeteer();
    // return this.ctx.render('imgShow.njk', {
    //   imgBase64,
    // });
    // console.log('imgBase64: ', imgBase64);
    return imgBase64;
  }
}
