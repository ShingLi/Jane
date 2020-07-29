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
    use runoob
    db // test db可以显示数据库或者集合
    db.runoobb.insert({"name": "licheng"}) // 在runoob 这个数据库中创建了一个runoobb的集合（表）插入了一条document
    db.runoobb.deleteMany({}) // 删除集合中所有的文档
    db.runoobb.update({"name": "licheng"}, {"name": "jane"}) // 修改集合数据
    db.runoobb.drop()
```

```js
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1/admin')
    const db = mongoose.connection
    db.on('open', () => {
        
    })
```

