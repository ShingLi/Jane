# 日志

## Vue

### transition-group

>2020-08-09

```js
    transtion-group 内部的元素必须要一个 `key`才显示
```

## BUG fixes(存在的问题)

+ permission.js
  + 没有验证token，只是单纯的判断有没有

git reset --hard origin/master

> 2021/04/26

+ `svg-sprite-loader`
+ 为什么会有这个问题？
+ 使用`chainWebpack`, 不熟悉文档
+ 解决

  +

  ```js
    config.module
      .rule('svg-loader')
      .test(/\.js$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .end()
      .include
      .add('') // 这里的路径是你项目中的绝对路径，还有不要忘记移除原版loader里面处理svg的模块
      .end()
  ```

+ 补充(2021/04/28)
  + `svgIcon`组件采用jsx编写，这里由于知识链断层写了一个bug

    ```js
      <!-- xlink:href 在jsx中不被识别 需要用xlinkHref -->
      render () {
        return (
          <svg>
            <use xlinkHref={ xxx }></use>
          </svg>
        )
      }
    ```

>2021/05/03

+ `mockserver` 无法正确读取文件
+ 为什么会有这样的问题？
+ `dev`环境使用`mock`数据来接近真实开发环境，但是读取不到路径
+ 解决

  ```js
    // axios baseUrl 会自动拼一个'/'开头 导致path.resolve() 直接返回了
    let reqUrl = req.originalUrl,  /admin/login
        newUrl = reqUrl.slice(1)
  ```
