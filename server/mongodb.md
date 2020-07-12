# 附加学习记录

> 2020-07-11

## 命令

### 基本命令

+ show dbs 显示已有数据库
+ use admin 进入数据库
+ show collections 显示数据库中的集合`可以说是关系型数据库中的表`

### 增删改查

```js
    show dbs
    use rookie
    show dbs // 此刻是不会显示菜鸟这个数据库
    db.rookie.insert({"skill": "前端"}) // 增
    // 这个时候新增了一个集合（表）
    db // rookie
    db.rookie.update({'skill': "nodejs"}) // 改
    db.rookie.find() //查
    db.dropDatabase() // 删
```
