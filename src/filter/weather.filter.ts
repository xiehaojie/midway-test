import { Catch, MidwayHttpError, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { WeatherEmptyDataError } from '../error/weather.error';

@Catch(WeatherEmptyDataError)
export class WeatherEmptyDataErrorFilter {
  @Inject()
  ctx: Context;
  async catch(err: MidwayHttpError, ctx: Context) {
    // ...

    return ctx.render('error.njk', {
      errorStatus: err.status,
      errorMessage: err.message,
    });
  }
}
