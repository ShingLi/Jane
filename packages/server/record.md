# 学习笔记

## 1.0

>2020-07-11

### require

+ require 加载文件，加载的文件可以写后缀名也可以不用写 [require简单介绍](https://blog.csdn.net/maoguiyou/article/details/51777398)
+ req.requestTime

>2020-07-12

### 代码执行

+ 路由模块代码路由非中间件代码会在服务启动的时候执行一次, 同一个路径的2个路由，路由直接移交控制权是通过`next(route)`, 如果params不为0页面渲染为`regular`否则为`special`

    ```js
        app.use('/user/:id', (req, res ,next) => {
            if (req.params.id == '0') next('route')
            else next()
        }, (req, res, next) => {
            res.send('regular')
        })
        app.use('/user/:id', (req, res, next) => {
            res.send('special')
        })
    ```

### replace

+ 正则替换`replace`

    ```js
        // 首字母大写
        \S 非空字符 \s 空字符
        var a = 'user'
        a = a.replace(/\S/, s => s.toUpperCase()) // User
    ```

> 2020-08-22

### express-jwt

+ 解析`webjsontoken`的中间件

    ```js
        // unless 过滤接口不需要携带token
        .unless({
            path: ['/admin/login'] // 这里过滤接口的路径要是绝对路径
        })
    ```

    参考 [express-unless](https://github.com/jfromaniello/express-unless)
