# 前台(Nuxt 服务端渲染)

## 错误日志

> 2020/11/03

```js
    修改webpack别名导致报错
        ERROR  Failed to compile with 6 errors
        friendly-errors 21:41:35
        These dependencies were not found:
        friendly-errors 21:41:35
        friendly-errors 21:41:35
        * nuxt_plugin_axios_139125ab in ./dist/indexjs
        * nuxt_plugin_axios_3566aa80 in ./dist/index.js
        friendly-errors 21:41:35
        * nuxt_plugin_plugin_260ac315 in ./dist/index.js
        friendly-errors 21:41:35
        * nuxt_plugin_terminal_a6a2501c in ./dist/index.js
        friendly-errors 21:41:35
        * ~/components/loading/loading.vue in ./dist/App.js
    问题定位： nuxt 项目有默认别名不能直接覆盖自己定义的别名要merge进去  
```

>2020/11/10

+ 将服务端中间件放到`middleware` 文件夹里面，`servermiddleware`中引入，对应的服务端中间件JS中引入fs模块，结果报错
+ servermiddle 中间件里面无法使用`process.server`

>2020/11/11

+ servermiddleware中间件`server.js` node 读取本地文件后`res.end(data)` 如果最后一部调用`nuxt()`, 会报错显示

    ```js
        Error: Can't set headers after they are sent to the client
    ```

+ 解决：最后本地mock解决数据不调用`nuxt()`
+ 原因：待查找

> 2020/11/14

+ 无法加载本地图片
+ 没有定位问题

> 2020/11/15

+ 页面可见性

> 2020/11/18

+ about 页面添加transition 属性 页面没有动画效果，需要用 nuxt-link 才能触发动画效果
+ 没定位问题
