# 数据层(node express)

## 错误日志

>2020/04/23

+ 问题：连接数据库失败
+ 原因：`mac的MongoDB数据库需要手动设置data`

  + 解决
  
  ```js
      sudo mongod --dbpath=/Users/licheng/data
  ```
