import { HttpStatus, MidwayHttpError } from '@midwayjs/core';

export class WeatherEmptyDataError extends MidwayHttpError {
  constructor(err?: Error) {
    super('天气数据是空的', HttpStatus.BAD_REQUEST, 'WEATHER_EMPTY_DATA_ERROR');
    if (err?.stack) {
      this.stack = err.stack;
    }
  }
}
