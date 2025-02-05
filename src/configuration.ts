import { Configuration, App, IMidwayContainer } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as view from '@midwayjs/view-ejs';
import * as staticFile from '@midwayjs/static-file';
import * as puppeteer from 'puppeteer';
import * as lodash from 'lodash';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { WeatherEmptyDataErrorFilter } from './filter/weather.filter';
import { ValidateErrorFilter } from './filter/validate.filter';

@Configuration({
  imports: [
    koa,
    validate,
    view,
    staticFile,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady(applicationContext: IMidwayContainer) {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
    this.app.useFilter([WeatherEmptyDataErrorFilter,ValidateErrorFilter]);
    //全局注册poppeteer，无需每次调用时引入。
    applicationContext.registerObject('puppeteer', puppeteer);
    //全局注册lodash，无需每次调用时引入。
    applicationContext.registerObject('lodash', lodash);
  }
}
