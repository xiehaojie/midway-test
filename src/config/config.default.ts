import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1736305632632_7030',
  view: {
    defaultViewEngine: 'nunjucks',
    cache: false,
    mapping: {
      '.njk': 'nunjucks',
    },
  },
  koa: {
    port: 7001,
  },
} as MidwayConfig;
