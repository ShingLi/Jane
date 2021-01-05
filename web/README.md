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

> 2020/11/22

+ plugins/loadscript 通过别名components 引入文件，找不到文件

    ```js
        import load from 'components/utils/loader'
        // 已经设置webpack 别名却在这个文件中不生效
    ```

+ 解决 import load from '~~/components/utils/loader'

> 2020/11/23

+ 因为我把路由页面加了后缀，比如`about`实际访问就是`about.html` 但是照顾之前的习惯配置了正则去匹配`about`开头的全部`redirect`到`about.html`
+ 结果想当然的

  ```JS
    extend (routes) {
        routes.concat(customRoutes) // 想当然了 这里还是要routes.push()
    }
  ```

>2020/11/26

+ 背景: 使用`iconfont`, 做svg图片，痛点是增加一个svg就要替换下生成的js
+ 解决: 使用`svg-sprite-loader`制作svg雪碧图
+ 结果: 无法正确显示svg雪碧图
+ 解决: exclude排除掉

```js
    nuxt.config.js 默认使用file-loader 去处理svg文件，和svg-sprite-loader冲突
    const fileloader = config.module.rules.find(rule => rule.test.test('.svg'))
    fileloader.exclude = resole('assets') // 这里巨坑，不能使用webpack 别名，需要自己配置
```

>2020/12/07

+ 使用loading组件 手动调用的时候，会触发页重新加载
+ 解决 `缓冲问题`

>2020/12/12

+ Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
+ 问题发生位置： `plugins/svg.js`
+ 问题发生背景：想动态引入项目里面的所有svg文件，做到自动化处理

+ `解决` 问题原因使用姿势错误,`require.context` 是`webpack`私有方法只有运行时才能打印，`log`同步打印会报错, 解决时间 `2021年1月3日`

>2021/01/03

+ 动画作用效果范围
+ 问题： `about`页面作用动画类名`side-about`， 页面切换动画的时候`index`页面收到到影响
+ 待解决
