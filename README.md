# 学习过程问题总结

## 踩坑问题

*20200510*

- aysncData
  - 不能访问到`window` 这个钩子函数运行在服务端或者路由更新之前, 报错 代码中断执行
- fetch
  - 不能访问到`window` 这个钩子函数运行在服务端或者切换到目标路由之前, 报错 代码中断执行
- beforeCreate/created
  - 运行在服务端或者客户端`window` undefined 不报错
- mounted
  - 运行在客户端`window` 能正确打印

