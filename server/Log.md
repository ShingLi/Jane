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
