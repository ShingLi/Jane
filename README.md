# 学习过程问题总结

## 踩坑问题

*20200510*

- aysncData
  - 不能访问到`window` 这个钩子函数运行在服务端或者路由更新之前, 报错 代码中断执行
- fetch
  - 不能访问到`window` 这个钩子函数运行在服务端或者切换到目标路由之前, 报错 代码中断执行
- beforeCreate/created
  - 运行在服务端或者客户端`window` undefined 不报错，其他任何`.vue`组件的生命周期都只在客户端被调用
- mounted
  - 运行在客户端`window` 能正确打印

*20200513*

- asyncData
  - 这个钩子函数虽然运行在服务端，但是如果和`data`中的字段重名时，以`asyncData`返回的数据为准
