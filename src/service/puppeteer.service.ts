// src/service/puppeteer.service.ts
import { Provide, Init, Destroy, Singleton, Autoload } from '@midwayjs/core';
import puppeteer from 'puppeteer';

@Provide()
@Singleton()
@Autoload()
export class PuppeteerService {
  private browser: any;

  @Init()
  async init() {
    this.browser = await puppeteer.launch({ headless: true });
  }

  @Destroy()
  async destroy() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  getBrowser() {
    return this.browser;
  }

  async newPage() {
    return this.browser.newPage();
  }
}
