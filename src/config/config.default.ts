import { MidwayConfig } from '@midwayjs/core';
import * as path from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1736305632632_7030',
  view: {
    defaultExtension: '.ejs',
    defaultViewEngine: 'ejs',
    // cache: false,
    mapping: {
      '.ejs': 'ejs',
    },
    rootDir: {
      default: path.join(__dirname, '../../view'),
      layout: path.join(__dirname, '../../view/layout'),
      debug: path.join(__dirname, '../../view/debug'),
    },
  },
  staticFile: {
    prefix: '/',
    dir: path.join(__dirname, '../../public'),
    maxAge: 31536000,
    buffer: true,
  },
  koa: {
    port: 7001,
  },
} as MidwayConfig;
