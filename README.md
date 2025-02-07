# midway/koa+puppteer截图echarts

具体细节可参考掘金上的文章[midway/koa+puppteer截图echarts]
该项目参考[基于nodejs在服务端生成echarts图片方案]中的模版及相关静态资源。

## 安装

node >= 16

```bash
# 可使用pnpm 安装
$ npm i
# 开发环境
$ npm run dev
```

<!-- add docs here for user -->

### 接口访问

   POST <http://localhost:7001/echarts>
   请求参数：{}

### 调试页面
<http://localhost:7001>

### pm2启动

```bash
# 可在package.json中自行设置cluster线程数量，提升node性能
$ npm pm2:start
```

# 其他
 puppteer报错请参考相关文档，例如需要安装无头浏览器，可cd到node_modules/puppeteer/install.mjs,运行该文件安装浏览器。

[midway/koa+puppteer截图echarts]: https://midwayjs.org

[基于nodejs在服务端生成echarts图片方案]: https://juejin.cn/post/7205484270471135289



